import {
  Controller,
  Get,
  Route,
} from "tsoa";
import mongoose from 'mongoose';
import { HelloWordAggregate, Product, product, ProductReducer } from "./Product";

@Route("product")
export class ProductController extends Controller {

  @Get("hi")
  public async helloWorld(
  ): Promise<Product | null> {

    const mongoDb = process.env["MONGO_DB"] as string;
    mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
    await HelloWordAggregate.create({
      what: 'Bought',
      with: { quantity: 1 },
      when: new Date(),
      who: 'admin'
    });

    const helloTwo = await HelloWordAggregate.find({});
    const result = helloTwo.reduce(ProductReducer, product);
    return result;
  }


  @Get("himany/{number}")
  public async helloWorldMany(
    number: number
  ): Promise<Product | null> {
    let result: Product | null = null;
    for (let i = 0; i < number; i++) {

      const mongoDb = process.env["MONGO_DB"] as string;
      mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
      await HelloWordAggregate.create({
        what: 'Bought',
        with: { quantity: 1 },
        when: new Date(),
        who: 'admin'
      });

      const helloTwo = await HelloWordAggregate.find({});
      result = helloTwo.reduce(ProductReducer, product);
    }
    return result;

  }
}