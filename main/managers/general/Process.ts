/**
 *
 */

export enum ProcessType {
  CreateVideoForYoutube,
  UploadVideoForYoutube,
  DownloadVideoForYoutube,
  DeleteVideoForYoutube,
}

export class Process {
  private static idCount: number = 0;
  public id: number;

  public static async start(process: Process) {}
  public static async pause(process: Process) {}
  public static async restart(process: Process) {}
  public static async delete(process: Process) {}
  public static async check(process: Process) {}

  constructor() {
    this.id = ++Process.idCount;
  }
}
