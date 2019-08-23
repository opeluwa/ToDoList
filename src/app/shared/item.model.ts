export class ItemModel {
  constructor(public listItem: string,
              public completed: boolean,
              public createdBy: string,
              public completedBy: string,
              public createdOn: number,
              public itemId: string) {}

  public setId(id: string) {
    this.itemId = id;
  }
}
