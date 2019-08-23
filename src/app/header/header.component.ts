import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isloggedIn = false; // is user logged in
  constructor(private authServ: AuthService) { }

  ngOnInit() {
    this.authServ.user.subscribe(data => {
      data ? this.isloggedIn = true : this.isloggedIn = false;  // decide if user is logged in.
    });
  }
  logout() {
    this.authServ.manuallogout();
  }
}
