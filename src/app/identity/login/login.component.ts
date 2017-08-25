import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(fb: FormBuilder, private auth: AuthService, private alert: AlertService) {
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
      console.log('Success2 - ' + response);
      //      $state.go('search');
      this.busy = false;

    },
    (message: string) => {
      console.log('Failure 2 - ' + message);
      this.alert.error('Login Failure: ' + message);
        this.busy = false;
      });
  }
  /*
    $scope.forgot = function () {
      $state.go('Forgot');
    };
   */

}
