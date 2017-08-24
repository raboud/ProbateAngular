import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ConfirmEmailComponent,
    AssociateComponent,
    PasswordChangeComponent,
    PasswordResetComponent,
    RefreshComponent,
    TokensComponent,
    PasswordForgotComponent],
    providers: []
})
export class IdentityModule { }
