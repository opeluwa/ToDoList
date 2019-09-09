import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  tokenTimer: any;  // init here so we can clear it on log out
  user = new BehaviorSubject<any>(null);  // emits details about the current user logged in
  constructor(private httpServ: HttpService, private router: Router) {}

  setAuth(data) {
    const storedCredential = {
      email: data.email,
      userId: data.userId,
      expirationTime: data.expirationTime,
      token: data.token
    };
    localStorage.setItem('user', JSON.stringify(storedCredential));
  }

  public get token() {
    return this.getLocalStorage ? JSON.parse(localStorage.getItem('user')).token : null;
  }

  public get email() {
    return this.getLocalStorage ? JSON.parse(localStorage.getItem('user')).email : null;
  }

  public get expirationTime() {
    return this.getLocalStorage ? JSON.parse(localStorage.getItem('user')).expirationTime : null;
  }

  public get getLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);

  }

  manuallogout() {  // if manual logout is selected
    if (localStorage.getItem('user')) {
      this.logout();
      window.location.reload();
    }
  }

  logoutTimer(exp: number) {  // logout when the token expires
    this.tokenTimer = setTimeout(() => {
      this.logout();
      window.location.reload();
    }, exp);
  }

  autologin() {  // auto login when page is first loaded
    if (!this.getLocalStorage) {
      this.logout();
    } else {
      const timeLeft = this.expirationTime - new Date().getTime();
      if (this.token && timeLeft > 0) {
        this.logoutTimer(timeLeft);
        this.user.next(this.getLocalStorage);
      } else {
        this.logout();
      }
    }
  }

  createAccount(email: string, password: string): Observable<any> { // on create a new account
    return this.httpServ.registerAccount({email, password}).pipe(tap(data => {
      this.setAuth(data); // if the creation auth is successful
    }, err => {
    }), map(data => {
      return data.message;
    }, err => {
      return err.message;
    }));
  }

  logIn(email: string, password: string): Observable<any> {  // when needs to login
    return this.httpServ.loginAccount({email, password}).pipe(tap(data => {
      this.setAuth(data);
      this.logoutTimer(this.expirationTime - new Date().getTime());
      this.user.next(this.getLocalStorage);
    }));
  }
}
