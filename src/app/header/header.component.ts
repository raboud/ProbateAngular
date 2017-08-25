import { Component, OnInit } from '@angular/core';

import { AuthService } from '../identity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated(): boolean { return this.authService.isAuthenticated(); }
  isAdmin(): boolean { return this.authService.isAdmin(); }
  isAccountAdmin(): boolean { return this.authService.isAccountAdmin(); }
  canSearch(): boolean { return this.authService.canSearch(); }

  Site(): string {
    return 'Chambers';
    //      return ServerAPI.SiteName();
  }

  logo(): string {
    if (this.authService.canSearch()) {
      return 'search';
    } else {
      return 'main';
    }
  }

}
