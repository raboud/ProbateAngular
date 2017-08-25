import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent
  ],
  providers: [
    AlertService
  ],
})

export class AlertModule {
}
