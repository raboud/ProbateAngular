import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert.models';
import { AlertService } from './alert.service';

@Component({
//  moduleId: module.id,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
//  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      console.log('atlerting recieved ' + alert);
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      this.alerts.push(alert);
      setTimeout(() => this.removeAlert(alert), 20000);
      console.log('atlerting added - ' + alert.getTypeString());
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

}


