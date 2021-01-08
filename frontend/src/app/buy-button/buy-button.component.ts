import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Router} from "@angular/router";
import {Product} from "../model/product";

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.component.html',
  styleUrls: ['./buy-button.component.css']
})
export class BuyButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private router: Router) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  buyProcess() {
    let products: Product [] = [];
    const product:Product = this.params.data
    product.quantity = 1;
    products.push(product);
    this.router.navigate(['buy'], { state: { products: products } });
  };

  refresh(): boolean {
    return false;
  }
}
