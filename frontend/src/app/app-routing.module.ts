import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {ProductComponent} from "./product/product.component";
import {BuyComponent} from "./buy/buy.component";
import {OrderComponent} from "./order/order.component";
import {AboutComponent} from "./about/about.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'buy',
    component: BuyComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin-products',
    component: AdminProductsComponent
  },
  {
    path: 'admin-orders',
    component: AdminOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
