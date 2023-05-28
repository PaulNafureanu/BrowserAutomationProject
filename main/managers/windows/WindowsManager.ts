import { ManagerObject } from "../abstractions/ManagerObject";

export class WindowsManager extends ManagerObject {
  private static instance: WindowsManager;
  private constructor() {
    super();
  }

  public static getInstance() {
    if (!WindowsManager.instance) {
      WindowsManager.instance = new WindowsManager();
    }
    return WindowsManager.instance;
  }
}
