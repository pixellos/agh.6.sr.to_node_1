import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Product} from "src/app/model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.css']
})
export class PreviewPopupComponent implements OnInit {
  products: Product [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, public dialog: MatDialog, private router: Router) {
    this.products.push(data.product);
  }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  };

  buyProcess() {
    this.dialog.closeAll();
    this.router.navigate(['buy'], { state: { products: this.products } });
  };

}
