import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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

declare var require : any;

const appRoutes : Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'historique',component:HistoriqueComponent},
  {path:'intervention/:id',component:InterventionComponent},
  {path:'interpretation',component:InterpretationComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InterpretationComponent,
    HistoriqueComponent,
    InterventionComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
