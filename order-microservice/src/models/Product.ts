
import mongoose from 'mongoose';

export type ProductAction = 'Bought'

export type ProductEvent = mongoose.Document & {
  who: 'admin' // todo: move to oauth and use id,
  when: Date
  what: ProductAction,
} & {
  what: 'Bought',
  with: { quantity: number }
}

export type Product = {
  quantity: number;
  name: string;
  creationDate: Date;
  tags: string[];
}

export const product : Product = {
  quantity: 0,
  name: '' as string,
  creationDate: new Date(),
  tags: [] as string[]
}

export function ProductReducer(p: Product, event: ProductEvent) {
  switch (event.what) {
    case 'Bought':
      const quantityAfter = p.quantity - event.with.quantity;
      const result = { ...p, quantity: quantityAfter } as Product;
      return result;
      break;
    default:
      return product;
      break;
  }
}
const GetProductAggregate = (aggregationType: string) => mongoose.model<ProductEvent>(aggregationType, new mongoose.Schema({
  quantity: Number,
  name: String,
  creationDate: Date,
  tags: [String],
  what: String,
  with: new mongoose.Schema({
    quantity: Number
  })
}, {safe:  false,validateBeforeSave: false} as mongoose.SchemaOptions))

export const HelloWordAggregate = GetProductAggregate('hello-world');