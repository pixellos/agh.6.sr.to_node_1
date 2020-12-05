import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CookieService} from "ngx-cookie-service";
import {Product} from "../model/product";

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private cookies: CookieService) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  addToCart() {
    let cartProducts: Product[] = [];
    if (this.cookies.check('cart')) {
      cartProducts = JSON.parse(this.cookies.get('cart'));
    }
    cartProducts.push(this.params.data);
    this.cookies.set('cart', JSON.stringify(cartProducts));
  };

  refresh(): boolean {
    return false;
  }
}
