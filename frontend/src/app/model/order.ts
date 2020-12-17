import {Product} from "./product";

export class Order {
  id: number;
  products: Product[];
  price: number;

  constructor(id: number, products: Product[], price: number) {
    this.id = id;
    this.products = products;
    this.price = price;
  }
}
