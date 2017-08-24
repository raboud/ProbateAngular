import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {
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

  submit() {
    //    this.model.userName = this.form.controls['userName'].value;
    //    this.model.password = this.form.controls['password'].value;
  }
}
