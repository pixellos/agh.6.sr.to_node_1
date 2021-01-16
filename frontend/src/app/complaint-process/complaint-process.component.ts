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

  orderId: string;
  compilantContent: string

  constructor(private router: Router, private httpClient: OrderHttpClient) {
    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
  }

  ngOnInit(): void {
  }

  backToOrders() {
    this.router.navigate(['orders']);
  }

  confirmComplaint() {
    this.httpClient.refund(this.compilantContent, this.orderId).subscribe(response => {
      this.router.navigate(['orders']);
    });

  }

}
