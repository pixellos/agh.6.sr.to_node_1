import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {mainRoutingProviders, routing} from "../route";
import { WelcomeComponent } from './welcome/welcome.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, BrowserAnimationsModule,
    mainRoutingProviders,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
