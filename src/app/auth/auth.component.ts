import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/Auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login = true;  // indicates login modes
  isError = false;   // displays errors or not
  errorMessage = ''; // error message is stored here
  @ViewChild('f', {static: false}) form: NgForm;  // the form
  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
    this.authServ.manuallogout();
  }

  onSubmit() {
    this.isError = false; // set error visibility to not show
    if (this.login) {    // if in logged mode
      this.authServ.logIn(this.form.value.email, this.form.value.password).pipe(take(1)).subscribe( result => {
        this.router.navigate(['/DashBoard']);   // when logged in navigate away
      }, err => {
        this.isError = true;  // set true
        console.log(err);
        if (err.statusText === 'Unknown Error') {  // if no connectioon to the server at all
          this.errorMessage = 'Failure to contact server. Please try again later';
        } else {
          this.errorMessage = err.error.message;
        }
      });
    } else {
      this.authServ.createAccount(this.form.value.email, this.form.value.password).pipe(take(1)).subscribe(result => {  // if on create account mode
        this.authServ.autologin(); // when logged in navigate away
        this.router.navigate(['/DashBoard']);
      }, err => {
        this.isError = true;  // error handling
        this.errorMessage = err.error.message;
      });
    }
  }
}
