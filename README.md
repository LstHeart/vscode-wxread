<div align="center">

# 微信阅读 VSCode 插件

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/lstheart.vscode-wxread.svg?label=Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=lstheart.vscode-wxread)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lstheart.vscode-wxread.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=lstheart.vscode-wxread)
[![Rating](https://img.shields.io/visual-studio-marketplace/stars/lstheart.vscode-wxread.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=lstheart.vscode-wxread)

</div>

## 特性

* [X] 个人书架书籍阅读及划线信息展示
* [X] 标签页基本信息可配置：标题文字、显示Logo
* [X] 状态栏快捷入口
* [X] 显示优化配置项：不透明度、右侧滚动条
* [X] 自定义代理端口
* [X] 远程开发环境，代理端口自动转发

## 使用方法

- 通过命令打开：
  `CTRL+SHIFT+P` 再输入：`wxread`
- 通过状态栏打开：
  点击 **![img](resources/book.png) 微信阅读**

## 其他说明

插件通过本地反向代理来解决 VSCode Webview Iframe 跨站问题，实现了基本的阅读功能，但相比网页版，有些交互功能无法使用，比如

- 不在个人书架里面的书籍，点击 `开始阅读`、 `加入到书架` 按钮无效，只能阅读个人书架的书籍
- 我的书架里面如果存在分组，分组无法点开

如果想完全体验网页版的功能，推荐使用 [frontend-box](https://marketplace.visualstudio.com/items?itemName=giscafer.frontend-box) 或 [Browser Preview](https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview&ssr=false#overview)；

大家使用过程中若遇到问题，欢迎提 Issue 一起讨论，谢谢~

## 致谢

- [VS Code 插件开发文档](https://github.com/Liiked/VS-Code-Extension-Doc-ZH)
- [vscode-git-graph](https://github.com/mhutchie/vscode-git-graph)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [koa2-nginx](https://github.com/my9074/koa2-nginx)
- [get-port](https://github.com/sindresorhus/get-port)
- [connect](https://github.com/senchalabs/connect)
