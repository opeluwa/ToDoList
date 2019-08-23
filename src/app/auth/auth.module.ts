import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthRouteModule} from './auth.route.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, AuthRouteModule],
  exports: [AuthComponent]
})
export class AuthModule {}
