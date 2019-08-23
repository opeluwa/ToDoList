import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [{ path: '', redirectTo: '/DashBoard', pathMatch: 'full'},
  { path: 'DashBoard', loadChildren: './dash-board/dashboard.module#DashboardModule' },
 {path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found, redirecting in 5 seconds'}},
  {path: '**', redirectTo: 'not-found' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
