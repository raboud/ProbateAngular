import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
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

  submitForm(value: any) {
    //    this.model.userName = this.form.controls['userName'].value;
    //    this.model.password = this.form.controls['password'].value;
  }
}
