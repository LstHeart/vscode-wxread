import express from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

const app = express();

app.all("*", function (req, res, next) {
  // 解决跨域问题
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

const options: Options = {
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
};

const proxy = createProxyMiddleware(options);

app.use("/", proxy);

export const startProxy = (port: number) => {
  app.listen(port, () => {
    console.log(`proxy server start @${port}`);
  });
};
