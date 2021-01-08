import { Injectable } from '@angular/core';
import {Product} from "./model/product";
import {DefaultService as ProductHttpClient} from "../client-product";

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  monitorLongDescription = "Stylowe wzornictwo - elegancka podstawa oraz smukła czarna obudowa\n" +
    "      Płynny obraz bez zniekształceń - technologia FreeSync™ oraz 4 ms GTG\n" +
    "      Komfort dla oczu - dzięki technologii flicker free i eye saver mode\n" +
    "      Szybki czas reakcji - zaledwie 4 ms\n" +
    "      Współczynnik kontrastu 10 000 000:1\n" +
    "      Złącza D-Sub (VGA), HDMI\n" +
    "      Funkcja polepszania obrazu Samsung Magic Upscale\n" +
    "      Funkcja Eco Saving\n" +
    "      Technologia ochrony oczu\n" +
    "      SPECJALNY TRYB DLA GRACZY\n" +
    "      Idealna czerń i kolory\n" +
    "      Możliwość montażu na ścianie";

  monitorImagePath = "https://techsetter.pl/wp-content/uploads/2019/06/notebooki-infografiki-2560x1440-iiyama-prolite.jpg"

  products: Product[] = [
    {id: '1', shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '2', shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '3', shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '4', shortDescription: "Monitor Samsung 30'", price: 1300, quantity: 100, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '5', shortDescription: "Monitor Toshiba 21'", price: 500, quantity: 20, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '6', shortDescription: "Monitor Toshiba 23'", price: 700, quantity: 40, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '7', shortDescription: "Monitor Toshiba 26'", price: 900, quantity: 70, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '8', shortDescription: "Monitor Toshiba 30'", price: 1300, quantity: 100, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '9', shortDescription: "Monitor LG 21'", price: 500, quantity: 20, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '10', shortDescription: "Monitor LG 23'", price: 700, quantity: 40, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '11', shortDescription: "Monitor LG 26'", price: 900, quantity: 70, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '12', shortDescription: "Monitor LG 30'", price: 1300, quantity: 100, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '13', shortDescription: "Monitor Huavei 21'", price: 500, quantity: 20, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '14', shortDescription: "Monitor Huavei 23'", price: 700, quantity: 40, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '15', shortDescription: "Monitor Huavei 26'", price: 900, quantity: 70, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '16', shortDescription: "Monitor Huavei 30'", price: 1300, quantity: 100, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '17', shortDescription: "Monitor Dell 21'", price: 500, quantity: 20, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '18', shortDescription: "Monitor Dell 23'", price: 700, quantity: 40, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '19', shortDescription: "Monitor Dell 26'", price: 900, quantity: 70, description: this.monitorLongDescription, image: this.monitorImagePath},
    {id: '20', shortDescription: "Monitor Dell 30'", price: 1300, quantity: 100, description: this.monitorLongDescription, image: this.monitorImagePath},
  ];

  constructor(private client: ProductHttpClient) { }

  getProducts(): Product[] {
    return this.products;
  }

  generateData() {
    this.products.forEach(p =>{
      this.client.create({
        shortDescription: p.shortDescription,
        price: p.price,
        quantity: p.quantity,
        description: p.description,
        image: p.image,
        tags: []})
        .subscribe(response => {})
    })
  }
}
