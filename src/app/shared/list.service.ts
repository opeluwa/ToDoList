import {Injectable} from '@angular/core';
import {ListModel} from './list.model';
import {ItemModel} from './item.model';
import {HttpService} from './http.service';
import {take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './Auth.service';

@Injectable({providedIn: 'root'})
export class ListService {

  list: ListModel[] = [];
  autoFetch = false;
  listSubject = new BehaviorSubject<any>(null);

  constructor(private httpServ: HttpService, private authServ: AuthService) {}

  fetchLists(): Observable<any> {  // list fetcher
    this.list = [];
    return this.httpServ.getList().pipe(tap(data => {


      if (!this.autoFetch) {
        this.autoFetch = true;
        this.regularUpdates();
      }
      data.content.map(result => {
        const listItem = [];
        result.list.listItems.map(items => { // create array of all items
          const item = new ItemModel(items.name, items.completed, items.createdBy, items.completedBy, items.createdOn, items._id);
          listItem.push(item);
        });
        let allCompleted = true;
        listItem.map(checker => { // decide if a list has been completed by checking all items
          if (!checker.completed) {
            allCompleted = false; // set to false if an item hasnt been completed
          }
        });
        const list = new ListModel(result.list.name, result.list.sharedWith, listItem, result.list.description, result.list.dateCreated,
          result.list.dueDate, result.list.priority, result.list._id, result.list.createdBy, allCompleted);
        this.list.push(list);
        this.listSubject.next(null);
      });
    }));
  }

  getList(): ListModel[] {  // return copy of lists
    return this.list.slice();
  }

  getListFromIndex(index: number): ListModel {
    return this.list.slice(index, index + 1)[0];
  }

  regularUpdates() {
    let customIntervalObservable = Observable.create(observer => {
    setInterval(() => {
      observer.next();
      this.fetchLists().pipe(take(1)).subscribe();
      }, 3000); });

    customIntervalObservable = customIntervalObservable.subscribe();

    // auto fetch list every 3 seconds
  }

  createList(list: ListModel) { // on creation of a list
    return this.httpServ.createNewList(list).pipe(tap(data => {
      const collectedItems = data.items;
      const items: ItemModel[] = list.list;
      items.map((data, index) => { // go through items and match generated item ids to items
        items[index].setId(collectedItems[index]);
      });
      const listData = new ListModel(data.listData.name, data.listData.sharedWith, items,
        data.listData.description, data.listData.dateCreated, data.listData.dueDate,
        data.listData.priority,  data.listData._id, this.authServ.email, false);

      this.list.push(listData);  // push list to array of lists
    }, err => {
      return err.error.message;
    }));
  }

  itemChange(id: string, value: boolean, indexInList: number, indexInItem: number): Observable<any> { // when an item is being checked
    return this.httpServ.checkItem({id, value}).pipe(tap(data => {
      this.list[indexInList].list[indexInItem].completed = value;
      this.completeRefresh(indexInList);
      this.listSubject.next(null);
    }));
  }

  completeRefresh(id: number) {   // when page needs to reload, due to a item being checked
    let allCompleted = true; // hold if all items have been completed
    this.list[id].list.map(checker => {  // go through items, if any item is not done mark as false
      if (!checker.completed) {
        allCompleted = false;
      }
    });
    this.list[id].completed = allCompleted;
  }

  removeFromDashBoard(id: string, index: number): Observable<any> {  // removing from dashboard
    return this.httpServ.removeFromDashBoard(id).pipe(tap(data => {
      this.list.splice(index, 1); // cut item from index
      this.listSubject.next(null);  // emit so dashboard items update
    }));
  }
}
