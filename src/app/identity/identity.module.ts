import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AssociateComponent } from './associate/associate.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RefreshComponent } from './refresh/refresh.component';
import { TokensComponent } from './tokens/tokens.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { AuthService } from './auth.service';
import { AuthInjectorService } from './auth-injector.service';
import { IdentityRoutingModule } from './identity-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IdentityRoutingModule,
  ],
  declarations: [
    AssociateComponent,
    ConfirmEmailComponent,
    LoginComponent,
    PasswordChangeComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    RefreshComponent,
    RegisterComponent,
    TokensComponent,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInjectorService,
      multi: true,
    }
  ],
  exports:
  [
    AssociateComponent,
    ConfirmEmailComponent,
    LoginComponent,
    PasswordChangeComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    RefreshComponent,
    RegisterComponent,
    TokensComponent,
  ],
})
export class IdentityModule { }
