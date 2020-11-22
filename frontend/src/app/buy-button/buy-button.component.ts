import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Router} from "@angular/router";

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
    this.router.navigateByUrl('/buy');
  };

  refresh(): boolean {
    return false;
  }
}
