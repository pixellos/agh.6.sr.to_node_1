import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import {AuthButtonComponent} from "./welcome/auth.component";
import {UserProfileComponent} from "./welcome/userProfile.component";
import {AgGridModule} from "ag-grid-angular";
import {ProductComponent} from "./product/product.component";
import {PreviewButtonComponent} from "./preview-button/preview-button.component";
import {BuyButtonComponent} from "./buy-button/buy-button.component";
import {PreviewPopupComponent} from "./preview-popup/preview-popup.component";
import {MatDialogModule} from "@angular/material/dialog";
import {BuyComponent} from "./buy/buy.component";
import {MatRadioModule} from "@angular/material/radio";
import {OrderComponent} from "./order/order.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import {CookieService} from "ngx-cookie-service";
import { DeleteButtonCartComponent } from './delete-button-cart/delete-button-cart.component';
import { ComplaintButtonComponent } from './complaint-button/complaint-button.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintProcessComponent } from './complaint-process/complaint-process.component';

import {ApiModule as OrderApiModule} from 'src/client-order/api.module'
import {Configuration as OrderConfiguration} from 'src/client-order/configuration'
import {ApiModule as ProductApiModule} from 'src/client-product/api.module'
import {Configuration as ProductConfiguration} from 'src/client-product/configuration'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AuthButtonComponent,
    UserProfileComponent,
    ProductComponent,
    PreviewButtonComponent,
    BuyButtonComponent,
    PreviewPopupComponent,
    BuyComponent,
    OrderComponent,
    CartComponent,
    AboutComponent,
    CartButtonComponent,
    DeleteButtonCartComponent,
    ComplaintButtonComponent,
    ComplaintComponent,
    ComplaintProcessComponent

  ],
  imports: [
    AuthModule.forRoot({
      domain: 'dev-mattp.eu.auth0.com',
      clientId: 'xm77JO3aZNJizsy45n4PC0PdZfTV1jDV',
      scope: 'openid email profile',
      audience: 'https://dev-mattp.eu.auth0.com/api/v2/',
      issuer: 'https://dev-mattp.eu.auth0.com/',
      httpInterceptor: {
        allowedList: [`http://localhost:3001/*`]
      },
    }),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    OrderApiModule.forRoot(() => new OrderConfiguration({basePath: 'http://localhost:3001'})),
    ProductApiModule.forRoot(() => new ProductConfiguration({basePath: 'http://localhost:3002'})),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
