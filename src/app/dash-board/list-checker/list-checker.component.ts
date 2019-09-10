import {Component, ElementRef, EventEmitter, OnInit, Renderer2} from '@angular/core';
import {ListModel} from '../../shared/list.model';
import {ListService} from '../../shared/list.service';

@Component({
  selector: 'app-list-checker',
  templateUrl: './list-checker.component.html',
  styleUrls: ['./list-checker.component.css']
})
export class ListCheckerComponent implements OnInit {
  close = new EventEmitter();   // emits for request to close the component
  list: ListModel;  // the list
  showDetails = false; // show extra details or not
  priority: number = 0;  // the prority of the list
  listIndex: number;  // index of list in service
  constructor(private listServ: ListService, private render: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    this.listServ.listSubject.subscribe(() => {
      this.list = this.listServ.getListFromIndex(this.listIndex);
    });
  }

  Onleave() {
    this.close.emit();
  }

  onChecked(event: Event, id: string, indexInItem: number) {
    this.listServ.itemChange(id, (event.target as HTMLInputElement).checked, this.listIndex, indexInItem).subscribe(data => {
    }, err => {
      this.render.setProperty((event.target as HTMLInputElement), 'checked',
        !(event.target as HTMLInputElement).checked); // using render2 to alter the check box back to original state
      err.error && err.error.message ? alert(err.error.message) : alert('Issue communicating with server, please try again later');
    });
  }

  onRemove() { // when removing a list from the dashboard
    this.listServ.removeFromDashBoard(this.list.id, this.listIndex).subscribe(() => {
      this.close.emit(); // close the component
    }, err => { // on error
      err.error.message ? alert(err.error.message) : alert('Issue communicating with server, please try again later');
    });
  }
}
