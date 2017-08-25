import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { IConfiguration } from './models/configuration';
import { StorageService } from './storage.service';

@Injectable()
export class ConfigurationService {
  serverSettings: IConfiguration;
  // observable that is fired when settings are loaded from server
  private settingsLoadedSource = new Subject();
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady: boolean;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.isReady = false;
    this.load();
  }

  load() {
    const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
    const url = `${baseURI}assets/appsettings.json`;
    this.http.get<IConfiguration>(url).subscribe((response) => {
      this.serverSettings = response;
      this.storageService.store('basketUrl', this.serverSettings.basketUrl);
      this.storageService.store('catalogUrl', this.serverSettings.catalogUrl);
      this.storageService.store('identityUrl', this.serverSettings.identityUrl);
      this.storageService.store('orderingUrl', this.serverSettings.orderingUrl);

      this.isReady = true;
      this.settingsLoadedSource.next();
    });
  }
}

