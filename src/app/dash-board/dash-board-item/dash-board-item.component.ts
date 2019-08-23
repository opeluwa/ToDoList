import {Component, Input, OnInit} from '@angular/core';
import {ListModel} from '../../shared/list.model';
import {ListService} from '../../shared/list.service';
import {AuthService} from '../../shared/Auth.service';

@Component({
  selector: 'app-dash-board-item',
  templateUrl: './dash-board-item.component.html',
  styleUrls: ['./dash-board-item.component.css']
})
export class DashBoardItemComponent implements OnInit {
  @Input() index: number; // index of list in array
  item: ListModel;  // list
  belongsToUser = false; // does list belong to user
  constructor(private listServ: ListService, private authServ: AuthService) { }

  ngOnInit() {
    this.item = this.listServ.getListFromIndex(this.index);
    this.item.createdBy === this.authServ.email ?
      this.belongsToUser = true : this.belongsToUser = false;  // figure out if list belongs to a user
  }

  colorBorder(){  // decides the color that the container should be
    if (this.item.priority === 1) {
      return 'red';
    } else if (this.item.priority === 2) {
      return 'orange';
    } else {
      return 'green';
    }
  }
}
