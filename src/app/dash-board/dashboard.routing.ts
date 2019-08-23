import {DashBoardComponent} from './dash-board.component';
import {AuthGuard} from '../shared/auth.guard';
import {ListResolver} from './list.resolver';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewListComponent} from './new-list/new-list.component';
import {ListCheckerComponent} from './list-checker/list-checker.component';

const routes: Routes = [{ path: '', component: DashBoardComponent, canActivate: [AuthGuard], resolve: [ListResolver], children: [
    {path: 'new', component: NewListComponent}, {path: 'edit', component: ListCheckerComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRouting {}


