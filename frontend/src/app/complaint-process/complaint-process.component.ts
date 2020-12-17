import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../model/product";

@Component({
  selector: 'app-complaint-process',
  templateUrl: './complaint-process.component.html',
  styleUrls: ['./complaint-process.component.css']
})
export class ComplaintProcessComponent implements OnInit {
  product: Product;

  constructor(private router: Router) {
    this.product = this.router.getCurrentNavigation().extras.state.product;
  }

  ngOnInit(): void {

  }

  backToOrders() {
    this.router.navigate(['orders']);
  }

  confirmComplaint() {

  }

}
