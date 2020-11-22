import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  product: Product = {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"};

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  confirmOrder() {
    this.router.navigateByUrl('/orders');
  }

  backToProducts() {
    this.router.navigateByUrl('/products');
  }

}
