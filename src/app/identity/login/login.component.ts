import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../../alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;  // new order form
  private busy: boolean;

  model = {
    userName: '',
    password: '',
  };

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = fb.group({
      'userName': [this.model.userName, Validators.required],
      'password': [this.model.password, Validators.required],
    });
    this.busy = false;
  }

  ngOnInit() {
  }

  isReady(): boolean {
    return this.form.valid && !this.busy;
  }

  submit() {
    this.model.userName = this.form.controls['userName'].value;
    this.model.password = this.form.controls['password'].value;
    this.busy = true;


    this.auth.login(this.model, this.form).then((response) => {
      this.router.navigate(['home']);
      // RAR      $state.go('search');

    },
      (message: string) => {
        this.alert.error('Login Failure: ' + message);
        this.busy = false;
      });
  }

}
