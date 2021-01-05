import { Product } from "./Product";
import fetch from 'node-fetch';


// As defined in http://localhost:3001/api-docs/#/default/Add
type OrderOutbound = {
    user: string,
    products: 
      {
        image: string,
        description: string,
        shortDescription: string,
        price: number,
        totalPrice: number,
        quantity: number,
        name: string
      }[]
    ,
    quantity: number,
    name: string
  }
const orderApiBase = "http://localhost:3000" 

export function CreateOrder(user: string, token: string, products: Product[]){
    const url = orderApiBase + "/order/add";
    const data: OrderOutbound = {
        user: user,
        products: products.map((e) => {return {
            image: e.image,
            description: e.description,
            shortDescription: e.shortDescription,
            price: e.price,
            totalPrice: e.price * e.quantity,
            quantity: e.quantity,
            name: "Needed?"
        }}),
        quantity: 1,
        name: "Needed?"
    }
    console.log(JSON.stringify(data));
    return fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': token}
    })
    .then(async res => {
      return await res.json()
    })
}