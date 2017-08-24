import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = sessionStorage; // localStorage;
  }

  public clear() {
    this.storage.clear();
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }

  public retrieve(key: string): any {
    let item: string;
    item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(this.storage.getItem(key));
    }

    return;
  }

  public store(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

}
