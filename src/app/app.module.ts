import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';

import {OrderModule} from 'ngx-order-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { HistoriqueComponent } from './historique/historique.component';
import { InterventionComponent } from './intervention/intervention.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {GoogleChartsModule} from 'angular-google-charts';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

declare var require : any;

const appRoutes : Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'historique',component:HistoriqueComponent},
  {path:'intervention/:id',component:InterventionComponent},
  {path:'interpretation',component:InterpretationComponent},
  {path:'users',component:UsersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InterpretationComponent,
    HistoriqueComponent,
    InterventionComponent,
    ToolbarComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    OrderModule,
    AppRoutingModule,
    GoogleChartsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
