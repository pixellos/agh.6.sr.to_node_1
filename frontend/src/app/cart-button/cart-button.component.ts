import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CartService} from "../cart.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private cartService:CartService) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  addToCart() {
    const product:Product = this.params.data
    product.quantity = 1;
    this.cartService.add(product)
  };

  refresh(): boolean {
    return false;
  }
}
