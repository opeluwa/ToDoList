import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListModel} from './list.model';
import {environment} from '../../environments/environment';
const BACKEND_URL_SIGNUP = environment.HttpApi + '/auth/signup';
const BACKEND_URL_LOGIN = environment.HttpApi + '/auth/login';
const BACKEND_URL_LIST = environment.HttpApi + '/list';

@Injectable({providedIn: 'root'})
export class HttpService {
  constructor(private http: HttpClient) {}
  registerAccount(credentials: {email: string, password: string}): Observable<any> { // register the account
    return this.http.post(BACKEND_URL_SIGNUP, credentials);
  }

  loginAccount(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(BACKEND_URL_LOGIN, credentials);
  }

  createNewList(list: ListModel): Observable<any> {
    return this.http.post<{message, items, listData}>( BACKEND_URL_LIST + '/newList', list);
  }

  getList(): Observable<any> {
    return this.http.get(BACKEND_URL_LIST + '/getList');
  }

  checkItem(data: {id: string, value: boolean }): Observable<any> {
    return this.http.put(BACKEND_URL_LIST + '/item', data);
  }

  removeFromDashBoard(id: string): Observable<any> {
    return this.http.delete(BACKEND_URL_LIST + '/remove/' + id);
  }
}
