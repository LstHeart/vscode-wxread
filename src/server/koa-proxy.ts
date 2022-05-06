const Koa = require("koa");
const proxy = require("koa2-nginx");

const app = new Koa();

const options = {
  "/": {
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
  },
};

const koaProxy = proxy(options);
app.use(koaProxy);

export const startProxy = (port: number) => {
  return app.listen(port, () => {
    console.log(`proxy server start @${port}`);
  });
};
