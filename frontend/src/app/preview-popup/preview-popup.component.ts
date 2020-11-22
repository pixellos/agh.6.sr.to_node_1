import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "src/app/model/product";

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.css']
})
export class PreviewPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}) {
    console.log("id:" + data.product.id)
  }

  ngOnInit(): void {
  }

}
