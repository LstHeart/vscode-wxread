// import fetch from "umi-request";
// TODO nodejs18 之后会内置fetch，之后可移除改依赖
import { fetch } from "undici";
import http from "http";
const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");
const connect = require("connect");

const app = connect();

const options = {
  target: "https://weread.qq.com",
  changeOrigin: true,
  secure: false,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(
    async (responseBuffer: Buffer, proxyRes: any, req: any, res: any) => {
      // 解决跨域问题
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      delete proxyRes.headers["x-frame-options"];
      delete proxyRes.headers["Content-Security-Policy"];

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

      if (req.url.includes("/web/book/bookmarklist")) {
        const proxyUrl = `${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
        res.setHeader("cache-control", "no-store");
        const resp = await fetch(proxyUrl, {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: req.headers.cookie,
          },
        });

        const result = await resp.json();

        return JSON.stringify(result);
      }

      return responseBuffer;
    }
  ),
};

const proxyMiddleware = createProxyMiddleware(options);

app.use("/", proxyMiddleware);

export const startProxy = (port: number) => {
  return http.createServer(app).listen(port, () => {
    console.log(`proxy server start @${port}`);
  });
};
