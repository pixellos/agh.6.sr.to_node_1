import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { errorResponse, isErrorResponse, okResponse } from '../../commons-microservice/src/CommonHelpers';
import { Connection } from "./Connection";
import { defaultProductDto, ProductAggregate, ProductDto, ProductEvent, ProductEventUnion, ProductPrefix, ProductReducer } from "./Product";

export namespace Products {
  export type ViewModel = { shortDescription: string; description: string; quantity: number; price: number; image: string; tags:string[]  };
  export type CreateProductCommandEvent = ViewModel & { type: 'CreateProductCommand'; };

  
  export async function GetProduct(id: string) {
    const connection = await Connection.connect();

    const Product = ProductAggregate(id);
    const doesExist = await Product.exists({});
    if (!doesExist) {
      return errorResponse<ProductDto>({ message: `Product with id ${id} does not exists.` });
    }
    const data = await FlatMapEvents(Product, id);
    return okResponse({ ...Product, ...data });
  }

  export async function AddProductCommand(props: { id: string, quantity: number,  type: 'AddProductCommand' }) {
    const connection = await Connection.connect();

    const o = await GetProduct(props.id)
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, Product } = o;
    return await Save(Product, { what: 'Added', with: {quantity: props.quantity} })
  }

  export async function BuyProductCommand(props: { id: string, quantity: number,  type: 'BuyProductCommand' }) {
    const connection = await Connection.connect();

    const o = await GetProduct(props.id)
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, Product } = o;
    return await Save(Product, { what: 'Bought', with: {quantity: props.quantity} })
  }

  export async function CreateProductCommand(p: CreateProductCommandEvent) {
    const connection = await Connection.connect();

    console.log("Entered createProductCommand");
    
    const id = v4();
    const aggregate = ProductAggregate(id);
    console.log("Created aggregate: ", aggregate);

    const doesExist = await aggregate.exists({});
    if (doesExist) {
      console.log("Already exists");

      return errorResponse<number>({ message: `Product with id ${id} already exists.` });
    }

    console.log("Entering Save");

    const save = await Save(aggregate, {
      what: 'Created',
      with: {
        shortDescription: p.shortDescription,
        description: p.description,
        quantity: p.quantity,
        price: p.price,
        image: p.image,
        tags: p.tags
      }
    })

    if (isErrorResponse(save)) {
      return errorResponse<number>({ message: 'Product cannot be saved. Try again.' });
    }

    return save;
  }

  export async function Save(product: Model<ProductEvent>, partial: ProductEventUnion) {
    console.log("Entered save: ", JSON.stringify(product), JSON.stringify(partial));

    const data = await product.find({});
    const previousRevisionCandidate = Math.max(...data.map(x => x.revision.valueOf()));
    const previousRevision = previousRevisionCandidate < 0 ? 0 : previousRevisionCandidate;
    const createResult = await product.create({
      who: 'admin',
      previousRevision: previousRevision,
      revision: previousRevision + 1,
      when: new Date(),
      ...partial,
    })
    if (isErrorResponse(createResult))
      return errorResponse<number>({ message: 'Product cannot be saved. Try again.' });
    return okResponse(previousRevision + 1);
  }

  export async function FlatMapEvents(m: Model<ProductEvent>, id: string) {
    const items = await m.find({});
    const result = items.reduce(ProductReducer, defaultProductDto) as ProductDto;
    result.id = id;
    return result;
  }

  export async function QueryAllProducts({ }) {
    const connection = await Connection.connect();
    const Products = await Connection.GetAggregatesIds(connection, ProductPrefix);
    console.log("Products: ", JSON.stringify(Products) );
    const result = await Promise.all(Products.map(o => ({ Product: ProductAggregate(o), id: o }))
      .map(x => FlatMapEvents(x.Product, x.id)));
    return okResponse(result);
  }
}