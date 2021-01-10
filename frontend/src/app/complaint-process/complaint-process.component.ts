import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../model/product";
import {DefaultService as OrderHttpClient} from "../../client-order";

@Component({
  selector: 'app-complaint-process',
  templateUrl: './complaint-process.component.html',
  styleUrls: ['./complaint-process.component.css']
})
export class ComplaintProcessComponent implements OnInit {
  product: Product;
  compilantContent: string

  constructor(private router: Router, private httpClient: OrderHttpClient) {
    this.product = this.router.getCurrentNavigation().extras.state.product;
    console.log(this.product)
  }

  ngOnInit(): void {

  }

  backToOrders() {
    this.router.navigate(['orders']);
  }

  confirmComplaint() {
    this.httpClient.refund(this.compilantContent, "null").subscribe(response => {});
    this.router.navigate(['orders']);
  }

}
