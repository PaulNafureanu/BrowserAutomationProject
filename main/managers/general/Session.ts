export class Session {
  private static idCount: number = 0;
  public id: number;

  constructor() {
    this.id = ++Session.idCount;
  }
}
