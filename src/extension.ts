import * as vscode from "vscode";
import * as proxy from "./server/proxy";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode.wxread" is now active!');

  let disposable = vscode.commands.registerCommand("wxread.start", () => {
    // 启动代理服务器
    const config = vscode.workspace.getConfiguration();
    const port = config.get("vscode-wxread.proxyPort") as number;
    proxy.startProxy(port);

    // 创建 webview panel
    const panel = vscode.window.createWebviewPanel(
      "wxread",
      "微信读书",
      vscode.ViewColumn.One,
      {
        enableScripts: true, // 启用js
        retainContextWhenHidden: true, // 状态保存
      }
    );

    // 设定标题图标
    panel.iconPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/weread.png")
    );

    panel.webview.html = `<!DOCTYPE html>
								<html lang="en">
								<head>
									<meta charset="UTF-8">
									<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
									<meta content="portrait" name="x5-orientation">
									<meta content="true" name="x5-fullscreen">
									<meta content="portrait" name="screen-orientation">
									<meta content="yes" name="full-screen">
									<meta content="webkit" name="renderer">
									<meta content="IE=Edge" http-equiv="X-UA-Compatible">
									<title>微信读书</title>
									<style>
									html,body,iframe{
										width:100%;
										height:100%;
										border:0;
										overflow: hidden;
									}
									</style>
								</head>
								<body>
									<iframe src="http://localhost:${port}"/>
								</body>
								</html>`;

    // vscode.window.showInformationMessage(`微信读书已启动,本地代理端口为${port}`);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
