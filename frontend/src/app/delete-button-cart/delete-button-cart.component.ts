import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-delete-button-cart',
  templateUrl: './delete-button-cart.component.html',
  styleUrls: ['./delete-button-cart.component.css']
})
export class DeleteButtonCartComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private cookies: CookieService) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  deleteFromCart() {

  };

  refresh(): boolean {
    return false;
  }
}
