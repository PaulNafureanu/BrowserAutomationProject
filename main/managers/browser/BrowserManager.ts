export class BrowserManager {
  private static instance: BrowserManager;
  private constructor() {}

  public static getInstance() {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }
}
