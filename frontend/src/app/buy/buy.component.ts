import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {Order} from "../model/order";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  products: Product [] = [];
  totalSum: number;

  constructor(private router: Router) {
    this.products = this.router.getCurrentNavigation().extras.state.products;
  }

  ngOnInit(): void {
     this.totalSum = this.products.reduce((acc, product) => acc += product.price, 0);
  }

  confirmOrder() {
    const order:Order = new Order(1, this.products, this.totalSum);
    this.router.navigate(['orders'], { state: { order: order} });
  }

  backToProducts() {
    this.router.navigateByUrl('/products');
  }

}
