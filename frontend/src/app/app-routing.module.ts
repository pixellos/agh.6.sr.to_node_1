import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
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
