import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CartService} from "../cart.service";

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
    this.cartService.products.push(this.params.data)
  };

  refresh(): boolean {
    return false;
  }
}
