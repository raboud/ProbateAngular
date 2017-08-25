import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { AlertService } from '../../alert';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})

export class TokensComponent implements OnInit {
  refreshTokens: server.RefreshToken[] = [];
  constructor(private tokensManagerService: AuthService, private alert: AlertService) { }

  ngOnInit() {
    this.tokensManagerService.getRefreshTokens()
      .then((results) => {
// rar        this.refreshTokens = results;
      }, (error: string) => {
        this.alert.error(error);
      });
  }

  deleteRefreshTokens(token: server.RefreshToken) {
    const tokenid: string = encodeURIComponent(token.id);
    this.tokensManagerService.deleteRefreshTokens(tokenid)
      .then(function (results) {
        this.refreshTokens = this.refreshTokens.filter(x => x !== alert);
      }, function (error: string) {
        this.alert.error(error);
      });
  }

}
