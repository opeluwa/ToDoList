import {NgModule} from '@angular/core';
import {DashBoardItemComponent} from './dash-board-item/dash-board-item.component';
import {NewListComponent} from './new-list/new-list.component';
import {ListCheckerComponent} from './list-checker/list-checker.component';
import {DashboardRouting} from './dashboard.routing';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashBoardComponent} from './dash-board.component';
import {PlaceholderDirective} from './placeholder.directive';
import { SorterPipe } from './sorter.pipe';
import { DropDownDirective } from './drop-down.directive';

@NgModule({
  declarations: [NewListComponent, ListCheckerComponent, DashBoardComponent, DashBoardItemComponent, PlaceholderDirective, SorterPipe, DropDownDirective],
  imports: [DashboardRouting, ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  exports: [NewListComponent, ListCheckerComponent, DashBoardItemComponent, DashBoardComponent, PlaceholderDirective],
  entryComponents: [ListCheckerComponent, NewListComponent]
})

export class DashboardModule {}
