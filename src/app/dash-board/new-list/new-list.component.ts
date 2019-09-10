import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ItemModel} from '../../shared/item.model';
import {ListModel} from '../../shared/list.model';
import {ListService} from '../../shared/list.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css'],
  animations: [trigger('divstate', [state('normal', style({opacity: 0, transform: 'translateY(0)'})),
  transition('normal => *', [style({ opacity: 0, transform: 'translateY(-100px)'}), animate(200)])
  ])]
})
export class NewListComponent implements OnInit {
  form: FormGroup;
  items =  new FormArray([]);
  sharedWith =  new FormArray([]);
  state = 'normal';
  showSettings = false;
  showDate = false;
  close = new EventEmitter();
  listPriority = 2;
  isError = false;
  errMessage = '';

  constructor(private listServ: ListService) { }

  ngOnInit() {
    this.form = new FormGroup({ // dynamic form init
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'dateDue': new FormControl(null),
      'items': this.items,
      'shared': this.sharedWith
    });
  }

  newItem() {  // new items added to a form
    (this.form.get('items') as FormArray).push(new FormGroup({
      items: new FormControl(null, [Validators.required])
    }));
  }

  returnControl() { // get the controls of the items
    return (<FormArray>this.form.get('items')).controls;
  }

  deleteItem(index: number) { // delete a dynamic item text box
    (this.form.get('items') as FormArray).removeAt(index);
  }

  onStateChange() {  // done when the state is needed to be changeed, by an animation
    this.showSettings = !this.showSettings;
    this.state === 'normal' ? this.state = 'show' : this.state = 'normal';
  }

  returnControlUsers() {  // getting all the controls of the shared
    return (<FormArray> this.form.get('shared')).controls;
  }

  addMember() { // adding new member to share list with
    (this.form.get('shared') as FormArray).push(new FormGroup({
      shared: new FormControl(null, [Validators.required, Validators.email])
    }));
  }

  deleteItemShared(index: number) {  // deleting a member text from shared lists
    ( <FormArray> this.form.get('shared')).removeAt(index);
  }

  onSubmit() {
    const title = (this.form.get('title').value); // list attirbutes
    const description = (this.form.get('description').value);
    const dueDate = (this.form.get('dateDue').value);
    const shared: string[] = [];
    this.isError = false;
    this.errMessage = '';

    (this.form.get('shared').value).map(data => {  // get all emails
      shared.push(data.shared);
    });

    const itemsArray: ItemModel[] = [];
    (this.form.get('items').value).map(data => {   // get all items together
      itemsArray.push(new ItemModel(data.items, false, null, null, new Date().getTime(), null));
    });
    const list: ListModel = new ListModel(title, shared, itemsArray, description, new Date().getTime(),
      new Date(dueDate).getTime(), this.listPriority, null, null, false);  // build list

    this.listServ.createList(list).pipe(take(1)).subscribe(data => {  // create the list
    this.form.reset(); // clear the list if needed.
    }, err => {
      this.isError = true; // show errors
      this.errMessage =  err.error.message;

      if (!err.error.message) {
        alert('Issue communicating with the server. Please check your connection and try again later.');
      }
    });
  }

  Onleave() {
    this.close.emit();  // close components
  }

  priority(num: number) {  // set priority
    this.listPriority = num;
  }
}
