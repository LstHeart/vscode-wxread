# vscode-extension-template

VSCode插件开发模板项目


### 打包发布常用操作

- 安装 VSCE

```bash
npm install -g vsce
```

- 登录插件中心
```bash
vsce login lstheart
```
> 获取Token: https://dev.azure.com/

- 发布插件
```bash
vsce publish
```
- 打包插件
```bash
vsce package
```