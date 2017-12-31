import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { } from '../typings/ForgotPasswordModel.cs.d';
import { AuthService } from '../auth.service';
import { AlertService } from '../../alert';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})

export class PasswordForgotComponent implements OnInit {
  form: FormGroup;  // new order form
  model: server.ForgotPasswordModel = { Email: '', ForgotPasswordPage: '' };
  private sent = false;

  constructor(fb: FormBuilder, private auth: AuthService, private alert: AlertService, private router: Router) {
    this.form = fb.group({
      'email': [this.model.Email, Validators.required]
    });
  }

  ngOnInit() {
  }

  isReady(): boolean {
    return this.form.valid && !this.sent;
  }

  submit() {
    this.sent = true;
    this.model.ForgotPasswordPage = '/PasswordReset';
    this.auth.forgotPassword(this.model, null)
      .then((response) => {
        this.sent = false;
        this.alert.success('Check your email for a link to set your password.');
        this.router.navigate(['home']);
      },
      function (message) {
        this.alert.error(message);
      });
  }


}
