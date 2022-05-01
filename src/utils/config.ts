import { workspace } from "vscode";

const START_COMMAND = "wxread.start";
const PANEL_TITLE = "微信读书";

const configState = {
  get proxyPort() {
    return getConfig("vscode-wxread.proxyPort") as number;
  },

  get showStatusBarItem() {
    return getConfig("vscode-wxread.showStatusBarItem") as boolean;
  },
};

function getConfig(key: string) {
  return workspace.getConfiguration().get(key);
}

export { START_COMMAND, PANEL_TITLE, configState };
