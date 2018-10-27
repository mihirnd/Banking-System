import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { routes } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NewUserComponent } from './new-user/new-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FundTransferComponent,
    DashboardComponent,
    NavbarComponent,
    ConfirmationComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routes
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
