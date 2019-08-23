import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './shared/Auth.service';

@Injectable()

export class HttpIntercept implements HttpInterceptor {
  constructor(private authServ: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const moddedRequest = req.clone({headers: req.headers.set('authorization', 'Bearer ' + this.authServ.token)});
      return next.handle(moddedRequest);
  }
}
