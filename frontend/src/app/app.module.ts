import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {mainRoutingProviders, routing} from "../route";


@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    mainRoutingProviders,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
