import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { IdentityModule } from './identity';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AlertModule } from './alert';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';
import { HomeComponent } from './home/home.component';

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
      return super.parse(url.toLowerCase());
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule,

    IdentityModule,
    AlertModule,
  ],
  providers: [
    ConfigurationService,
    StorageService,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
  }
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
