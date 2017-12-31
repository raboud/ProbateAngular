import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AssociateComponent,
  ConfirmEmailComponent,
  LoginComponent,
  RefreshComponent,
  RegisterComponent,
  PasswordChangeComponent,
  PasswordForgotComponent,
  PasswordResetComponent,
  TokensComponent,
} from './components';

// we are configured for all paths to be lowercase via tha LowerCaseUrlSerializer
const routes: Routes = [
  {
    path: 'identity',
    children:
    [
      { path: 'associate', component: AssociateComponent },
  { path: 'confirmemail', component: ConfirmEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordchange', component: PasswordChangeComponent },
  { path: 'passwordforgot', component: PasswordForgotComponent },
  { path: 'passwordreset', component: PasswordResetComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tokens', component: TokensComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class IdentityRoutingModule { }
