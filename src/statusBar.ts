import {
  StatusBarAlignment,
  StatusBarItem,
  window,
  ConfigurationChangeEvent,
} from "vscode";
import { Disposable } from "./utils/disposable";
import { Event } from "./utils/event";
import { START_COMMAND, configState } from "./utils/config";

export class StatusBar extends Disposable {
  private readonly statusBarItem: StatusBarItem;
  private isVisible: boolean = false;

  constructor(onDidChangeConfiguration: Event<ConfigurationChangeEvent>) {
    super();

    const statusBarItem = window.createStatusBarItem(
      StatusBarAlignment.Right,
      100
    );
    statusBarItem.text = `$(book) 微信读书`;
    statusBarItem.tooltip = `点击打开微信读书`;
    statusBarItem.command = START_COMMAND;
    this.statusBarItem = statusBarItem;

    this.registerDisposables(
      onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("vscode-wxread.showStatusBarItem")) {
          this.refresh();
        }
      }),
      statusBarItem
    );
    this.refresh();
  }

  private refresh() {
    const shouldBeVisible = configState.showStatusBarItem;

    if (this.isVisible !== shouldBeVisible) {
      if (shouldBeVisible) {
        this.statusBarItem.show();
      } else {
        this.statusBarItem.hide();
      }
      this.isVisible = shouldBeVisible;
    }
  }
}
