import { Pipe, PipeTransform } from '@angular/core';
import {ListModel} from '../shared/list.model';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {
  transform(value: ListModel[], selected: number): any {
    return value.sort((n1, n2) => {
      if (selected === 1) {
          return n1.priority > n2.priority ? 1 : -1;
      } else if (selected === 2) {
        return n1.priority < n2.priority ? 1 : -1;
      } else if (selected === 3) {
        return n1.dueDate < n2.dueDate ? 1 : -1;
      } else if (selected === 4) {
        return n1.dueDate > n2.dueDate ? 1 : -1;
      } else if (selected === 5) {
        return n1.dateCreated > n2.dateCreated ? 1 : -1;
      } else if (selected === 6) {
        return n1.dateCreated < n2.dateCreated ? 1 : -1;
      }
    });
  }
}
