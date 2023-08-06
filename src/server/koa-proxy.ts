// TODO nodejs18 之后会内置fetch，之后可移除改依赖
import { fetch } from "undici";
import http from "http";
import {
  createProxyMiddleware,
  responseInterceptor,
  Options,
} from "http-proxy-middleware";
import { ExtensionContext } from "vscode";
const connect = require("connect");

export class WXProxy {
  readonly proxy: any;
  options: Options;
  constructor(context: ExtensionContext, port: number) {
    this.options = this.setupOptions(context);

    const app = connect();
    const proxyMiddleware = createProxyMiddleware(this.options);
    app.use("/", proxyMiddleware);

    this.proxy = this.startProxy(app, port);
  }

  setupOptions = (context: ExtensionContext) => {
    return <Options>{
      target: "https://weread.qq.com",
      changeOrigin: true,
      secure: false,
      selfHandleResponse: true,
      onProxyRes: this.onProxyRes(context),
    };
  };

  startProxy(app: any, port: number) {
    return http.createServer(app).listen(port, () => {
      console.log(`wx-proxy server start @${port}`);
    });
  }

  // 响应拦截
  onProxyRes = (context: ExtensionContext) =>
    responseInterceptor(
      async (responseBuffer: Buffer, proxyRes: any, req: any, res: any) => {
        // 解决跨域问题
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        delete proxyRes.headers["x-frame-options"];
        delete proxyRes.headers["Content-Security-Policy"];

        // cookie自动延续
        if (req.url.includes("/web/login/weblogin")) {
          const tempKey = Math.random().toString().slice(-9);
          context.globalState.update("renewalKey", tempKey);
          res.setHeader(
            "set-cookie",
            `wr_fp=${tempKey}; Max-Age=31104000; Domain=localhost;secure;SameSite=None; Path=/;`
          );
        }
        // 解决跨站问题
        if (proxyRes.headers["set-cookie"]) {
          const cookies: string[] = [];

          proxyRes.headers["set-cookie"].forEach((cookie: string) => {
            cookies.push(
              cookie.replace(
                "Domain=.weread.qq.com;",
                "Domain=localhost;secure;SameSite=None;"
              )
            );
          });
          res.setHeader("set-cookie", cookies);
        }

        // 书籍划线
        if (req.url.includes("/web/book/bookmarklist")) {
          const result = (await fetchResponse(proxyRes, req, res)) as any;

          return JSON.stringify(result);
        }

        return responseBuffer;
      }
    );
}

async function fetchResponse(proxyRes: any, req: any, res: any) {
  const proxyUrl = `${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
  res.setHeader("cache-control", "no-store");
  const resp = await fetch(proxyUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  });

  return resp.json();
}
