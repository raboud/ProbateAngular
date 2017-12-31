import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { } from '../typings/ResetPasswordModel.cs.d';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;  // new order form

    model: server.ResetPasswordModel = {
      userId: '',
      password: '',
      confirmPassword: '',
      code: ''
    };

    constructor(fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
      this.form = fb.group({
        'confirmPassword': [this.model.confirmPassword, Validators.required],
        'password': [this.model.password, Validators.required],
        });
    }

    ngOnInit() {
        this.model.userId = this.route.snapshot.queryParamMap.get('userId');
        this.model.code = this.route.snapshot.queryParamMap.get('code');
      }

    submit() {
  //    this.model.userName = this.form.controls['userName'].value;
  //    this.model.password = this.form.controls['password'].value;
    }
  }
