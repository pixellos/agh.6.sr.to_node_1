import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-delete-button-cart',
  templateUrl: './delete-button-cart.component.html',
  styleUrls: ['./delete-button-cart.component.css']
})
export class DeleteButtonCartComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private cartService: CartService) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  deleteFromCart() {
    console.log(this.params);
    this.params.api.updateRowData({remove: [this.params.data]});
    this.cartService.delete(this.params.data.id)
  }

  refresh(): boolean {
    return false;
  }
}
