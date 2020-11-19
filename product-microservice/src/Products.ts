import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { Connection } from "./Connection";
import { ProductAction } from './EventBase';
import { defaultProductDto, ProductAggregate, ProductDto, ProductEvent, ProductEventUnion, ProductPrefix, ProductReducer } from "./Product";
import { errorResponse } from "./ProductController";

export type ErrorResponse = {
  error: true,
  message: string
}

export function isErrorResponse(o: any): o is ErrorResponse {
  return (o as ErrorResponse).error;
}

export namespace Products {
  export type ViewModel = { name: string; quantity: number; image: string; attributes: string[]; };
  export type CreateProductCommandEvent = ViewModel & { type: 'CreateProductCommand'; };

  
  export async function GetProduct(id: string) {
    const Product = ProductAggregate(id);
    const doesExist = await Product.exists({});
    if (!doesExist) {
      return errorResponse({ message: `Product with id ${id} does not exists.` });
    }
    const data = await FlatMapEvents(Product, id);
    return { Product, data };
  }

  export async function AddProductCommand(props: { id: string, quantity: number,  type: 'AddProductCommand' }) {
    const o = await GetProduct(props.id)
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, Product } = o;
    await Save(Product, { what: 'Added', with: {quantity: props.quantity} })
  }

  export async function BuyProductCommand(props: { id: string, quantity: number,  type: 'BuyProductCommand' }) {
    const o = await GetProduct(props.id)
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, Product } = o;
    await Save(Product, { what: 'Bought', with: {quantity: props.quantity} })
  }

  export async function CreateProductCommand(p: CreateProductCommandEvent) {
    const id = v4();
    const aggregate = ProductAggregate(id);
    const doesExist = await aggregate.exists({});
    if (doesExist) {
      return errorResponse({ message: `Product with id ${id} already exists.` });
    }
    const save = await Save(aggregate, {
      what: 'Created',
      with: {
        name: p.name,
        quantity: p.quantity,
        image: p.image,
        attributes: p.attributes
      }
    })
    if (isErrorResponse(save)) 
      return errorResponse({ message: 'Product cannot be saved. Try again.' });
  }

  export async function Save(product: Model<ProductEvent>, partial: ProductEventUnion) {
    const data = await product.find({});
    const previousRevision = Math.max(...data.map(x => x.revision.valueOf()));
    const createResult = await product.create({
      who: 'admin',
      previousRevision: previousRevision,
      revision: previousRevision + 1,
      when: new Date(),
      ...partial,
    })
    if (isErrorResponse(createResult))
      return errorResponse({ message: 'Product cannot be saved. Try again.' });
    return previousRevision + 1;
  }

  export async function FlatMapEvents(m: Model<ProductEvent, {}>, id: string) {
    const items = await m.find({});
    const result = items.reduce(ProductReducer, defaultProductDto) as ProductDto;
    result.id = id;
    return result;
  }

  export async function QueryAllProducts({ }) {
    const connection = await Connection.connect();
    const Products = await Connection.GetAggregatesIds(connection, ProductPrefix);
    const result = await Promise.all(Products.map(o => ({ Product: ProductAggregate(o), id: o }))
      .map(x => FlatMapEvents(x.Product, x.id)));
    return result;
  }
}
