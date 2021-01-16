import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {Order} from "../model/order";
import {Payment} from "../model/payment";
import {DefaultService as ProductHttpClient} from "src/client-product/api/default.service";
import {DefaultService as OrderHttpClient} from "src/client-order/api/default.service";
import {QuantityProduct} from "../model/quantity-product";
import {AddressPayment} from "../model/address-payment";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  products: Product [] = [];
  totalSum: number;
  payment: Payment = new Payment();
  address: AddressPayment = new AddressPayment();

  selectedReceiveMethod: string = 'Poczta';
  receiveMethods = [
    'Poczta',
    'Kurier',
    'Odbior osobisty'
  ];
  confirmed: boolean = false;

  constructor(private router: Router, private httpClient: ProductHttpClient, private orderHttpClient: OrderHttpClient) {
    this.products = this.router.getCurrentNavigation().extras.state.products;
  }

  ngOnInit(): void {
    this.totalSum = this.products.reduce((acc, product) => acc += product.price, 0);
  }

  confirmOrder() {
    this.confirmed = true;
    const quantityProducts = this.products.map(p => new QuantityProduct(p.id, p.quantity))

    this.httpClient.buy(quantityProducts).subscribe(response => {
      const orderId = response.data
      this.orderHttpClient.address(orderId, this.address).subscribe(response => {
        this.orderHttpClient.pay(this.totalSum, "card", orderId).subscribe(response => {
          this.router.navigate(['orders']);
        })
      })
    })
  }

  backToProducts() {
    this.router.navigateByUrl('/products');
  }

  acceptPayment() {
    this.payment.accepted = true;
    this.payment.status = 'ZAAKCEPTOWANO PLATNOSC'
  }
}
