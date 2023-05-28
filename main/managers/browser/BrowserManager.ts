import { ManagerObject } from "../abstractions/ManagerObject";

export class BrowserManager extends ManagerObject {
  private static instance: BrowserManager;
  private constructor() {
    super();
  }

  public static getInstance() {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }
}
