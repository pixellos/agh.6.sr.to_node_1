import {Injectable} from '@angular/core';
import {Product} from "./model/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products: Product[] = []

  constructor() {
  }

  add(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id)
    if (index > -1) {
      const entity = this.products.find(p => p.id === product.id)
      this.products[index] = new Product(entity.id, entity.shortDescription, entity.price, entity.quantity + 1, entity.description)
    } else {
      this.products.push(product)
    }
  }

  delete(id: string) {
    const index = this.products.findIndex(product => product.id == id)
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
