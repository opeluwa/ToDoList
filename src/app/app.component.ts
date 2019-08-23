import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'To-Do';
  constructor(private authServ: AuthService) { }
  ngOnInit(): void {
    this.authServ.autologin();
  }
}
