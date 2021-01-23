import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {DefaultService as OrderHttpClient} from "../../client-order";

@Component({
  selector: 'app-refund-button',
  templateUrl: './refund-button.component.html',
  styleUrls: ['./refund-button.component.css']
})
export class RefundButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private httpClient: OrderHttpClient) { }

  agInit(params: any): void {
    this.params = params;
  }

  refund() {
    this.httpClient.acceptRefund("invalid product", this.params.data.id).subscribe(response => {})
  }

  refresh(): boolean {
    return false;
  }

}
