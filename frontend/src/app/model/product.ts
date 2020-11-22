export class Product {
  id: number;
  shortDescription: string;
  price: number;
  quantity: number;
  description: string;

  constructor(id: number, shortDescription: string, price: number, quantity: number, description: string) {
    this.id = id;
    this.shortDescription = shortDescription;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}
