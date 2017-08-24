import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  refreshTokens = [];
  constructor() { }

  ngOnInit() {
  }

  /*
        tokensManagerService.getRefreshTokens()
            .then(function (results) {

                $scope.refreshTokens = results.data;

            }, function (error: any) {
                alert(error.data.message);
            });

        $scope.deleteRefreshTokens = function (index, tokenid) {

            tokenid = encodeURIComponent(tokenid);

            tokensManagerService.deleteRefreshTokens(tokenid)
                .then(function (results) {

                    $scope.refreshTokens.splice(index, 1);

                }, function (error: any) {
                    alert(error.data.message);
                });
        }
  */

}
