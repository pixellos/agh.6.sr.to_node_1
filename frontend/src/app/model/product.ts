export class Product {
  id: string;
  shortDescription: string;
  price: number;
  quantity: number;
  description: string;
  image: string;

  constructor(id: string, shortDescription: string, price: number, quantity: number, description: string) {
    this.id = id;
    this.shortDescription = shortDescription;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}
