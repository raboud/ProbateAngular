import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  IdentityModule,
  AssociateComponent,
  ConfirmEmailComponent,
  LoginComponent,
  RefreshComponent,
  RegisterComponent,
  PasswordChangeComponent,
  PasswordForgotComponent,
  PasswordResetComponent,
  TokensComponent,
} from '.';

const routes: Routes = [
  { path: 'associate', component: AssociateComponent },
  { path: 'confirmEMail', component: ConfirmEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordChange', component: PasswordChangeComponent},
  { path: 'passwordForgot', component: PasswordForgotComponent},
  { path: 'passwordReset', component: PasswordResetComponent},
  { path: 'refresh', component: RefreshComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'tokens', component: TokensComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class IdentityRoutingModule { }
