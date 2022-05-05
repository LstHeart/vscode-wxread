import {
  ExtensionContext,
  commands,
  ConfigurationChangeEvent,
  workspace,
} from "vscode";
import * as proxy from "./server/proxy";
import { StatusBar } from "./statusBar";
import { EventEmitter } from "./utils/event";
import { START_COMMAND, configState } from "./utils/config";
import { Panel } from "./panel";

export function activate(context: ExtensionContext) {
  console.log('Congratulations, your extension "vscode.wxread" is now active!');

  let currentPanel: Panel | undefined = undefined;
  const { proxyPort } = configState;

  // 状态栏
  const configurationEmitter = new EventEmitter<ConfigurationChangeEvent>();
  const onDidChangeConfiguration = configurationEmitter.subscribe;

  let wxreadStatusBar = new StatusBar(onDidChangeConfiguration);

  const configChange = workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("vscode-wxread.showStatusBarItem")) {
      configurationEmitter.emit(event);
    }
  });

  let wxreadStart = commands.registerCommand(START_COMMAND, () => {
    if (!currentPanel) {
      // 启用代理
      proxy.startProxy(proxyPort);

      // 实例化Panel
      currentPanel = new Panel(context);
      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
        },
        undefined,
        context.subscriptions
      );
    }

    // vscode.window.showInformationMessage(`微信读书已启动,本地代理端口为${proxyPort}`);
  });

  const commandEvents = [wxreadStatusBar, configChange, wxreadStart];

  context.subscriptions.push(...commandEvents);
}

// this method is called when your extension is deactivated
export function deactivate() {}
