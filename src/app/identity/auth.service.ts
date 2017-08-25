import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { CanActivate, ActivatedRoute, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from '../configuration.service';
import { StorageService } from '../storage.service';

import { } from './typings/ChangePasswordModel.cs.d';
import { } from './typings/ConfirmEmailModel.cs.d';
import { } from './typings/CreateAccountModel.cs.d';
import { } from './typings/EnableUserModel.cs.d';
import { } from './typings/ForgotPasswordModel.cs.d';
import { } from './typings/GetCostResult.cs.d';
import { } from './typings/ResetPasswordModel.cs.d';
import { } from './typings/UserModel.cs.d';

@Injectable()
export class AuthService implements CanActivate {
  private jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
  private urlHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  authentication = {
    isAuth: false,
    isAdmin: false,
    isAccountAdmin: false,
    accountName: '',
    userName: '',
    useRefreshTokens: false
  };

  externalAuthData = {
    provider: '',
    userName: '',
    externalAccessToken: ''
  };

  private serviceBase: string;
  private clientId: string;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private storageService: StorageService) {

    this.configurationService.settingsLoaded$.subscribe(x => {
      console.log('config loaded');
      this.serviceBase = this.configurationService.serverSettings.identityUrl;
      this.clientId = this.configurationService.serverSettings.clientId;
      console.log('this.serviceBase ' + this.serviceBase );
    });

  }

  getErrorMessage(response: Response, form: FormGroup) {
    let errors: any[];
    errors = [];
    if (response.status === 400) {
      // handle validation error
      const validationErrorDictionary = JSON.parse(response.text());
      for (const fieldName in validationErrorDictionary) {
        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
          if (form && form.controls[fieldName]) {
            // integrate into angular's validation if we have field validation
            form.controls[fieldName].setErrors({ invalid: true });
          } else {
            // if we have cross field validation then show the validation error at the top of the screen
            errors.push(validationErrorDictionary[fieldName]);
          }
        }
      }
    } else {
      errors.push('something went wrong!');
    }
    /*

        if (response.message) {
          errors.push(response..message);
        }

        if (response.error_description) {
          errors.push(response.error_description);
        }

        if (response.data) {
          if (response.data.message) {
            errors.push(response.data.message);
          }
          if (response.data.modelState) {
            for (let key in response.data.modelState) {
              for (let i = 0; i < response.data.modelState[key].length; i++) {
                errors.push(response.data.modelState[key][i]);
              }
            }
          }
        }
     */
    return errors.join(' ');
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  logOut() {

    this.storageService.removeItem('authorizationData');

    this.authentication.isAuth = false;
    this.authentication.userName = '';
    this.authentication.useRefreshTokens = false;
    this.authentication.accountName = '';
    this.authentication.isAdmin = false;
    this.authentication.isAccountAdmin = false;
  }

  createAccount(model: server.CreateAccountModel): Promise<boolean> {
    return this.http.post(this.serviceBase + 'api/account/createAccount', model)
      .toPromise()
      .then((response) => {
        return false;
      })
      .catch((error) => {
        this.handleError(error);
        return false;
      });
  }

  createAdmin(model: server.UserModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/createAdmin', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  createUser(model: server.UserModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/createUser', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  changePassword = function (model: server.ChangePasswordModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/ChangePassword', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  };

  confirmEmail(model: server.ConfirmEmailModel, form: FormGroup) {

    this.logOut();

    this.http.post(this.serviceBase + 'api/account/ConfirmEmail', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  forgotPassword(model: server.ForgotPasswordModel, form: FormGroup) {

    this.logOut();

    this.http.post(this.serviceBase + 'api/account/ForgotPassword', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  resetPassword(model: server.ResetPasswordModel, form: FormGroup) {

    this.logOut();

    this.http.post(this.serviceBase + 'api/account/ResetPassword', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  login(model, form: FormGroup) {

    let data: string = 'grant_type=password&username=' + model.userName + '&password=' + model.password;

    if (model.useRefreshTokens) {
      data = data + '&client_id=' + this.clientId;
    }


    return this.http.post(this.serviceBase + '/token', data, { headers: this.urlHeaders })
    .toPromise()

      .then((response) => {
        const body = response.json();
        if (body) {
        console.log('Success - ' + body.toString());


        if (model.useRefreshTokens) {
          this.storageService.store('authorizationData',
            {
              token: body.access_token,
              userName: model.userName,
              refreshToken: body.refresh_token,
              useRefreshTokens: true
            });
        } else {
          this.storageService.store('authorizationData',
            {
              token: body.access_token,
              userName: model.userName,
              refreshToken: '',
              useRefreshTokens: false
            });
        }
        this.authentication.isAuth = true;
        this.authentication.userName = body.userName;
        this.authentication.accountName = body.accountName;
        this.authentication.isAdmin = body.isAdmin === 'True';
        this.authentication.isAccountAdmin = body.isAccountAdmin === 'True';
        this.authentication.useRefreshTokens = model.useRefreshTokens;
        console.log(JSON.stringify(this.storageService.retrieve('authorizationData')));
      }
      }, (err: any) => {
        console.log('Failure - ' + err);
        this.logOut();
        console.log('Failure1 - ' + err);
        return Promise.reject(this.getErrorMessage(err, form));
      });
  }

  isAdmin(): boolean {
    return this.authentication.isAdmin;
  }

  isAccountAdmin() {
    return this.authentication.isAccountAdmin;
  }

  isAuthenticated() {
    return this.authentication.isAuth;
  }

  canSearch() {
    return this.isAuthenticated(); // RAR || ((ServerAPI.SiteConfig) && ServerAPI.SiteConfig.AllowAnonymousSearches);
  }

  canPurchase() {
    return this.authentication.isAuth;
  }

  fillAuthData() {

    const authData = this.storageService.retrieve('authorizationData');
    if (authData) {
      this.authentication.isAuth = true;
      this.authentication.userName = authData.userName;
      this.authentication.useRefreshTokens = authData.useRefreshTokens;
    }
  }

  enableUser(id: string, enabled: boolean) {
    const data: server.EnableUserModel = { Enabled: enabled, Id: id };
    this.http.post(this.serviceBase + 'api/account/EnableUser', data)
      .toPromise()
      .then((response) => response, (err) => this.getErrorMessage(err, null));
  }

  getAdminList() {
    this.http.get(this.serviceBase + 'api/account/AdminList')
      .toPromise()
      .then((response) => response, (err) => this.getErrorMessage(err, null));
  }

  refreshToken() {
    let authData;
    authData = this.storageService.retrieve('authorizationData');

    if (authData) {

      if (authData.useRefreshTokens) {

        let data: string;
        data = 'grant_type=refresh_token&refresh_token=' + authData.refreshToken + '&client_id=' + this.clientId;

        this.storageService.removeItem('authorizationData');

        this.http.post(this.serviceBase + 'token', data, { headers: this.urlHeaders })
          .toPromise()
          .then((response) => {

            this.storageService.store('authorizationData',
              {
                // RAR                token: response.access_token,
                // RAR                userName: response.userName,
                // RAR                refreshToken: response.refresh_token,
                useRefreshTokens: true
              });

            return response;

          }, (err) => {
            this.logOut();
            return this.getErrorMessage(err, null);
          });
      }
    }
  }

  obtainAccessToken(externalData) {
    this.http.get(this.serviceBase + 'api/account/ObtainLocalAccessToken',
      {
        params: {
          provider: externalData.provider,
          externalAccessToken: externalData.externalAccessToken
        }
      })
      .toPromise()
      .then((response) => {
        this.storageService.store('authorizationData',
          {
            // RAR            token: response.access_token,
            // RAR            userName: response.userName,
            refreshToken: '',
            useRefreshTokens: false
          });

        this.authentication.isAuth = true;
        // RAR        this.authentication.userName = response.userName;
        this.authentication.useRefreshTokens = false;

        return response;
      }, (err) => {
        this.logOut();
        this.getErrorMessage(err, null);
      });
  }

  registerExternal(registerExternalData) {
    this.http.post(this.serviceBase + 'api/account/registerexternal', registerExternalData)
      .toPromise()
      .then((response) => {

        this.storageService.store('authorizationData',
          {
            // RAR            token: response.access_token,
            // RAR            userName: response.userName,
            refreshToken: '',
            useRefreshTokens: false
          });

        this.authentication.isAuth = true;
        // RAR        this.authentication.userName = response.userName;
        this.authentication.useRefreshTokens = false;
      }, (err) => {
        this.logOut();
        this.getErrorMessage(err, null);
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
/*     //  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (!this.canSearch()) {
      if ((state.toState.name === 'search')) {
        event.preventDefault();
        this.router.navigate(['login']);
      }
    }
    if ((toState.name === 'SearchConfig' ||
      toState.name === 'SiteConfig' ||
      toState.name === 'Administrators')
      && (this.isAdmin())) {
      event.preventDefault();
      this.router.navigate(['home']);
    }
    if ((toState.name === 'accountEdit' ||
      toState.name === 'acountLedger'
    )
      && (this.isAccountAdmin())) {
      event.preventDefault();
      this.router.navigate(['home']);
    }
 */  }
}
