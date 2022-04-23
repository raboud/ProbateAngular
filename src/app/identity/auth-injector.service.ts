import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StorageService } from '../storage.service';

@Injectable()
export class AuthInjectorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = this.getAuthorizationHeader();
    // Clone the request to add the new header.
    let authReq = req;
    if (authHeader) {
      authReq = authReq = req.clone({setHeaders: {Authorization: authHeader}});
    }
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }

  getAuthorizationHeader(): string{
    const authData = this.storageService.retrieve('authorizationData');
    if (authData) {
        return 'Bearer ' + authData.token;
    }
    return;
  }

  constructor(private storageService: StorageService) { }

}
