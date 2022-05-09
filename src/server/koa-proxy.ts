const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");
const connect = require("connect");

const app = connect();

const options = {
  target: "https://weread.qq.com",
  changeOrigin: true,
  secure: false,
  // 解决跨站问题
  cookiePathRewrite: {
    "/": "/;secure;SameSite=None",
  },
  cookieDomainRewrite: {
    "*": "localhost",
  },
  onProxyRes(proxyRes: any) {
    // 解决跨域问题
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
  },
};

const proxyMiddleware = createProxyMiddleware(options);

app.use("/", proxyMiddleware);

export const startProxy = (port: number) => {
  return http.createServer(app).listen(port, () => {
    console.log(`proxy server start @${port}`);
  });
};
