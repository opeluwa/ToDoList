import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ListService} from '../shared/list.service';

@Injectable({providedIn: 'root'})
export class ListResolver implements Resolve<any> {
  constructor(private listServ: ListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.listServ.fetchLists().subscribe(data => {  // fetchs data before page loads
      this.listServ.listSubject.next(null);
    });
  }
}
