import { Injectable } from '@angular/core';
;
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ConfigurationService } from '../configuration.service';
import { StorageService } from '../storage.service';

import { ChangePasswordModel, ConfirmEmailModel, CreateAccountModel, EnableUserModel, ForgotPasswordModel, ResetPasswordModel, UserModel } from './typings/server.cs';

interface TOKEN {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  'as:client_id': string;
  isAdmin: string;
  isAccountAdmin: string;
  accountName?: string;
  userName: string;
  '.issued': string;
  '.expires': string;
}


@Injectable()
export class AuthService {
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

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
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private storageService: StorageService) {

    this.configurationService.settingsLoaded$.subscribe(x => {
      this.serviceBase = this.configurationService.serverSettings.identityUrl;
      this.clientId = this.configurationService.serverSettings.clientId;
    });

  }


  private handleError2(form: FormGroup) {
    return (err: any) => {
      let errors: any[];
      errors = [];

      if (err instanceof HttpResponse) {
        if (err.status === 400) {
          // handle validation error
          const validationErrorDictionary = JSON.parse(err.body);
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
        }
      }
      return Observable.throw( errors.join(' '));
    };
  }


  getErrorMessage(response: HttpResponse<any>, form: FormGroup) {
    let errors: any[];
    errors = [];
    if (response.status === 400) {
      // handle validation error
      const validationErrorDictionary = JSON.parse(response.body);
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

  createAccount(model: CreateAccountModel): Promise<boolean> {
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

  createAdmin(model: UserModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/createAdmin', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  createUser(model: UserModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/createUser', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  changePassword = function (model: ChangePasswordModel, form: FormGroup) {
    this.http.post(this.serviceBase + 'api/account/ChangePassword', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  };

  confirmEmail(model: ConfirmEmailModel, form: FormGroup) {
    this.logOut();

    this.http.post(this.serviceBase + 'api/account/ConfirmEmail', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  forgotPassword(model: ForgotPasswordModel, form: FormGroup) {
    this.logOut();

    return this.http.post(this.serviceBase + '/api/account/ForgotPassword', model)
      .toPromise()
      .then((response) => response, (response) => this.getErrorMessage(response, form));
  }

  resetPassword(model: ResetPasswordModel, form: FormGroup) {
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

    this.logOut();

    return this.http.post<TOKEN>(this.serviceBase + '/token', data, { headers: this.urlHeaders })
      .toPromise()
      .then((response) => {
          if (model.useRefreshTokens) {
            this.storageService.store('authorizationData',
              {
                token: response.access_token,
                userName: model.userName,
                refreshToken: response.refresh_token,
                useRefreshTokens: true
              });
          } else {
            this.storageService.store('authorizationData',
              {
                token: response.access_token,
                userName: model.userName,
                refreshToken: '',
                useRefreshTokens: false
              });
          }
          this.authentication.isAuth = true;
          this.authentication.userName = response.userName;
          this.authentication.accountName = response.accountName;
          this.authentication.isAdmin = response.isAdmin === 'True';
          this.authentication.isAccountAdmin = response.isAccountAdmin === 'True';
          this.authentication.useRefreshTokens = model.useRefreshTokens;
      }, (err: any) => {
        this.logOut();
        return Promise.reject(this.getErrorMessage(err, form));
      });
  }

  isAdmin(): boolean { return this.authentication.isAdmin; }
  isAccountAdmin() { return this.authentication.isAccountAdmin; }
  isAuthenticated() { return this.authentication.isAuth; }
  canSearch() { return this.isAuthenticated(); /* RAR || ((ServerAPI.SiteConfig) && ServerAPI.SiteConfig.AllowAnonymousSearches); */ }
  canPurchase() { return this.authentication.isAuth; }

  fillAuthData() {
    const authData = this.storageService.retrieve('authorizationData');
    if (authData) {
      this.authentication.isAuth = true;
      this.authentication.userName = authData.userName;
      this.authentication.useRefreshTokens = authData.useRefreshTokens;
    }
  }

  enableUser(id: string, enabled: boolean) {
    const data: EnableUserModel = { Enabled: enabled, Id: id };
    this.http.post(this.serviceBase + 'api/account/EnableUser', data)
      .toPromise()
      .then((response) => response, (err) => this.getErrorMessage(err, null));
  }

  getAdminList() {
    return this.http.get(this.serviceBase + '/api/account/AdminList')
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
/*
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
*/
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

  getRefreshTokens() {
    return this.http.get(this.serviceBase + 'api/refreshtokens')
      .toPromise()
      .then(function (results) {
        return results;
      });
  }

  deleteRefreshTokens(tokenid) {
    return this.http.delete(this.serviceBase + 'api/refreshtokens/?tokenid=' + tokenid)
      .toPromise()
      .then(function (results) {
        return results;
      });
  }

  getAuthorizationHeader(): string{
    const authData = this.storageService.retrieve('authorizationData');
    if (authData) {
        return 'Bearer ' + authData.token;
    }
    return;
  }

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
 */
}
