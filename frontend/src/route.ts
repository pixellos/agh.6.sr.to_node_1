import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app/app.component";
import {AdminProductsComponent} from "./app/admin-products/admin-products.component";
import {AdminOrdersComponent} from "./app/admin-orders/admin-orders.component";
export const mainRoutes: Routes = [
    {
        path: '', component: AppComponent
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
export const mainRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(mainRoutes);
