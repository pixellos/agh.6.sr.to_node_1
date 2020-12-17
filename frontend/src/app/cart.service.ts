import {Injectable} from '@angular/core';
import {Product} from "./model/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products: Product[] = []

  constructor() {
  }

  delete(id:Number){
    const index = this.products.findIndex(product => product.id == id)
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
