import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../identity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private auth: AuthService,
    private router: Router
  ) { }

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

  logout() {
    this.authService.logOut();
    this.router.navigate(['home']);
  }

}
