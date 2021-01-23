import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {DefaultService as OrderHttpClient} from "../../client-order";

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.css']
})
export class SendButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(private httpClient: OrderHttpClient) { }

  agInit(params: any): void {
    this.params = params;
  }

  send() {
    this.httpClient.send({"id": this.params.data.id}).subscribe(response => {})
  }

  refresh(): boolean {
    return false;
  }
}
