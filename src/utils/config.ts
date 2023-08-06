import { workspace, Extension } from "vscode";
import * as vscode from "vscode";

const START_COMMAND = "wxread.start";

const configState = {
  get proxyPort() {
    return getConfig("vscode-wxread.proxyPort") as number;
  },
  get showStatusBarItem() {
    return getConfig("vscode-wxread.showStatusBarItem") as boolean;
  },

  get panelTitle() {
    return getConfig("vscode-wxread.panelTitle") as string;
  },

  get showPanelIcon() {
    return getConfig("vscode-wxread.showPanelIcon") as boolean;
  },
  get panelOpacity() {
    return getConfig("vscode-wxread.panelOpacity") as number;
  },
  get envName() {
    const extension = vscode.extensions.getExtension("lstheart.vscode-wxread");
    return getEnvironment(extension);
  },
  get hideScrollbar() {
    return getConfig("vscode-wxread.hideScrollbar") as boolean;
  },
};

function hasConfig(key: string) {
  return workspace.getConfiguration().has(key);
}

function getConfig(key: string) {
  return workspace.getConfiguration().get(key);
}

function updateConfig(key: string, value: any) {
  return workspace.getConfiguration().update(key, value, true);
}

function getEnvironment(extension: Extension<any> | undefined) {
  let environment: "local" | "remote" = "local";
  if (extension) {
    // 在本地工作区运行时，remoteName 会返回 undefined
    if (
      extension.extensionKind === vscode.ExtensionKind.Workspace &&
      vscode.env.remoteName
    ) {
      // vscode.window.showInformationMessage("I am running remotely!");
      // vscode.env.remoteName 会显示具体的环境名称, 'ssh-remote' | 'codespaces' | 'wsl' | undefined 等等
      console.log("wx-remoteName:", vscode.env.remoteName);

      environment = "remote";
    }
  }

  return environment;
}

function getProxyUri() {
  const port = configState.proxyPort;
  let proxyUri = vscode.Uri.parse(`http://localhost:${configState.proxyPort}`);

  // 检测插件运行环境，远程则自动转发代理端口
  if (configState.envName === "remote") {
    const defaultForwardedPorts =
      (getConfig("remote.SSH.defaultForwardedPorts") as any[]) || [];
    const hasForwarded = defaultForwardedPorts.some(
      (item) => item.localPort === port
    );

    if (!hasForwarded) {
      return vscode.env.asExternalUri(proxyUri);
    }
  }

  return proxyUri;
}

export {
  START_COMMAND,
  configState,
  getProxyUri,
  hasConfig,
  getConfig,
  updateConfig,
};
