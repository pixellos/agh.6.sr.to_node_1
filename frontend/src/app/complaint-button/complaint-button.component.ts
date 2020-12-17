import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Product} from "../model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-complaint-button',
  templateUrl: './complaint-button.component.html',
  styleUrls: ['./complaint-button.component.css']
})
export class ComplaintButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private router: Router) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  notifyComplaint() {
    let product: Product = this.params.data;
    this.router.navigate(['complaint-process'], { state: { product: product } });
  }

  refresh(): boolean {
    return false;
  }

}
