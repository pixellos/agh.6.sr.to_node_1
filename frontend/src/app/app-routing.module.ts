import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {ProductComponent} from "./product/product.component";

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
