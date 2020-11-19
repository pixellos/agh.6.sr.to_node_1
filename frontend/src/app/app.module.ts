import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import { MatSidenavModule } from "@angular/material/sidenav";
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './welcome/auth.component';
import { UserProfileComponent } from './welcome/userProfile.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AuthButtonComponent,
    UserProfileComponent,
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'dev-mattp.eu.auth0.com',
      clientId: 'xm77JO3aZNJizsy45n4PC0PdZfTV1jDV',
      scope: 'openid email profile',
      
    }),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, MatButtonModule, MatIconModule,  MatSidenavModule,
    BrowserAnimationsModule,
    
    // Import the module into the application, with configuration
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
