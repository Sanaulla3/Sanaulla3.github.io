import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { RestapiService } from './restapi.service';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: AuthorizationComponent},
  {path: 'home/:id', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
