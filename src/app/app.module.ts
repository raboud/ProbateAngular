import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { IdentityModule } from './identity/identity.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule.forRoot(), BrowserModule,

    IdentityModule
  ],
  providers: [AuthService, AlertService, ConfigurationService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
