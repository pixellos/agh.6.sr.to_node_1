import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {PreviewPopupComponent} from "../preview-popup/preview-popup.component";

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.component.html',
  styleUrls: ['./preview-button.component.css']
})
export class PreviewButtonComponent implements ICellRendererAngularComp {
  public params: any;

  constructor(public dialog: MatDialog) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  preview() {
    const dialogRef = this.dialog.open(PreviewPopupComponent, {
      width: '50%',
      data: {product: this.params.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refresh(): boolean {
    return false;
  }
}
