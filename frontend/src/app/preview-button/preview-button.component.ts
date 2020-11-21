import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.component.html',
  styleUrls: ['./preview-button.component.css']
})
export class PreviewButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
