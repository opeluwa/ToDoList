import {ItemModel} from './item.model';

export class ListModel {
  constructor(public name: string,
              public sharedWith: string[],
              public list: ItemModel[],
              public description: string,
              public dateCreated: number,
              public dueDate: number,
              public priority: number,
              public id: string,
              public createdBy: string,
              public completed: boolean) {}
}
