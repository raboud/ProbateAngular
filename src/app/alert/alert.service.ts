import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Alert, AlertType } from './alert.models';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {         // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert('success', message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert('danger', message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert('AlertType.info', message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert('warning', message, keepAfterRouteChange);
  }

  alert(type: string, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    const a = new Alert();
    a.message = message;
    a.type = type;
    this.subject.next(a);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }

}
