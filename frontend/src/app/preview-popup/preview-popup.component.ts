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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}, public dialog: MatDialog, private router: Router) {
    console.log("id:" + data.product.id)
  }

  ngOnInit(): void {
  }

  buyProcess() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/buy');
  };

}
