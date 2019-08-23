import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpIntercept} from './http.interceptor';
import {DashboardModule} from './dash-board/dashboard.module';
import {AuthModule} from './auth/auth.module';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardModule,
    AuthModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
