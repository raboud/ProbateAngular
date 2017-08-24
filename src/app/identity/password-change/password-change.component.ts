import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  form: FormGroup;  // new order form

  model = {
  };

  constructor(fb: FormBuilder) {
    this.form = fb.group({
//      'userName' : [this.model.userName, Validators.required],
//      'password' : [this.model.password, Validators.required],
    });
  }

  ngOnInit() {
  }

  submitForm() {
//    this.model.userName = this.form.controls['userName'].value;
//    this.model.password = this.form.controls['password'].value;
  }
}
