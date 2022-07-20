import {
  window,
  ViewColumn,
  Uri,
  ExtensionContext,
  WebviewPanel,
} from "vscode";
import path from "path";
import { configState } from "./utils/config";

export class Panel {
  onDidDispose: any;
  // private panel: WebviewPanel;
  constructor(context: ExtensionContext, panelTitle: string, port: number) {
    let panel: WebviewPanel | undefined = window.createWebviewPanel(
      "wxread",
      panelTitle,
      ViewColumn.One,
      {
        enableScripts: true, // 启用js
        retainContextWhenHidden: true, // 状态保存
      }
    );

    // 设定标题图标
    if (configState.showPanelIcon) {
      panel.iconPath = Uri.file(
        path.join(context.extensionPath, "resources/weread.png")
      );
    }

    panel.webview.html = `<!DOCTYPE html>
								<html lang="en">
								<head>
									<meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
									<title>${panelTitle}</title>
									<style>
									html,body,iframe{
										width:101.5%;
										height:100%;
										border:0;
                    padding:0;
										overflow: hidden;
                    opacity:${configState.panelOpacity};
									}
									</style>
								</head>
								<body>
									<iframe src="http://localhost:${port}"/>
								</body>
								</html>`;

    return panel;
  }
}
