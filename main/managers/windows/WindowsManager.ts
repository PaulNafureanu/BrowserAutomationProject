export class WindowsManager {
  private static instance: WindowsManager;
  private constructor() {}

  public static getInstance() {
    if (!WindowsManager.instance) {
      WindowsManager.instance = new WindowsManager();
    }
    return WindowsManager.instance;
  }
}
