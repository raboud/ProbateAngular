import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent} from '../home/home.component';
import { IdentityModule } from '../identity';
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', },
    { path: 'home', component: HomeComponent },
    { path: 'characters', loadChildren: '../identity/identity-routing.module.ts' },
];

@NgModule({
  imports: [
    IdentityModule,
    RouterModule.forRoot(
      appRoutes
//      , { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
