import {
  ExtensionContext,
  commands,
  ConfigurationChangeEvent,
  workspace,
  window,
} from "vscode";
import * as proxy from "./server/koa-proxy";
import { StatusBar } from "./statusBar";
import { EventEmitter } from "./utils/event";
import { START_COMMAND, configState } from "./utils/config";
import { Panel } from "./panel";
import getPort from "get-port";

export function activate(context: ExtensionContext) {
  console.log('Congratulations, your extension "vscode.wxread" is now active!');

  let currentPanel: Panel | null | undefined = undefined;
  let proxyServer: any;
  let proxyStarted = false;

  // 状态栏
  const configurationEmitter = new EventEmitter<ConfigurationChangeEvent>();
  const onDidChangeConfiguration = configurationEmitter.subscribe;

  let wxreadStatusBar: StatusBar = new StatusBar(onDidChangeConfiguration);

  const configChange = workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("vscode-wxread.showStatusBarItem")) {
      configurationEmitter.emit(event);
    }
  });

  let wxreadStart = commands.registerCommand(START_COMMAND, async () => {
    const { proxyPort, panelTitle } = configState;

    const portResult = await getPort({ port: configState.proxyPort });
    if (portResult !== proxyPort && !proxyStarted) {
      window.showErrorMessage(
        `微信读书默认代理端口${proxyPort}已占用,请调整后继续!`
      );
      return;
    }

    if (!currentPanel) {
      // 启用代理
      proxyServer = proxy.startProxy(proxyPort);
      proxyStarted = true;

      // 实例化Panel
      currentPanel = new Panel(context, panelTitle, proxyPort);
      currentPanel.onDidDispose(
        () => {
          currentPanel = null;
          proxyServer.close();
        },
        undefined,
        context.subscriptions
      );
    }
  });

  const commandEvents = [wxreadStatusBar, configChange, wxreadStart];

  context.subscriptions.push(...commandEvents);
}

export function deactivate() {}
