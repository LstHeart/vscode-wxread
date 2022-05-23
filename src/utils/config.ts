import { workspace } from "vscode";

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
};

function getConfig(key: string) {
  return workspace.getConfiguration().get(key);
}

export { START_COMMAND, configState };
