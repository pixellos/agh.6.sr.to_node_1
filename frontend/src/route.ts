import {RouterModule, Routes} from "@angular/router";
import {AdminProductsComponent} from "./app/admin-products/admin-products.component";
import {AdminOrdersComponent} from "./app/admin-orders/admin-orders.component";
import {WelcomeComponent} from "./app/welcome/welcome.component";
export const mainRoutes: Routes = [
    {
        path: '', component: WelcomeComponent
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
