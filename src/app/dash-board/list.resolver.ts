import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ListService} from '../shared/list.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ListResolver implements Resolve<any> {
  constructor(private listServ: ListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.listServ.fetchLists().pipe(tap(data => {  // fetchs data before page loads
      this.listServ.listSubject.next(null); }));
  }
}
