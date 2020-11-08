
import mongoose from 'mongoose';
import { EventBase, EventBaseSchema, ProductAction } from './EventBase';



export type ProductEventUnion = (
  | {
    what: 'Changed' //changed existing product or created a new one
    with: Product
  }| {
    what: 'Created' //changed existing product or created a new one
    with: Product
  }
  | { what: 'Added', with: { quantity: number } } //added more products of this type to inventory
  | { what: 'Bought', with: { quantity: number } } //removed products from inventory
);

export type ProductEvent = mongoose.Document & EventBase & {
  what: ProductAction
} & ProductEventUnion;

export type Product = {
  quantity: number;
  name: string;
  attributes: string[];
}

export const defaultProduct: Product = {
  quantity: 0,
  name: '' as string,
  attributes: [] as string[]
}

export type ProductDto = Product & {
  id?: string
  status: 'Started' | 'Sent' | 'Derived' | 'Returned'
};

export const defaultProductDto: ProductDto = {
  ...defaultProduct,
  status: 'Started'
}

export function ProductReducer(p: ProductDto, event: ProductEvent) {
  switch (event.what) {
    case 'Changed':
    case 'Created':
      const copy = Object.keys(defaultProduct)
        .map(x => x as keyof Product)
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? x[key] }), p as Partial<Product>);
      const result = copy as ProductDto;
      result.status = 'Started';
      result.id = event.id;
      return result;
    case 'Added':
      return { ...p, status: 'Sent' } as ProductDto;
    case 'Bought':
      return { ...p, status: 'Sent' } as ProductDto;
    default:
      return defaultProductDto;
      break;
  }
}

export const ProductPrefix = "Product-";

const GetProductAggregate = (aggregationType: string) => mongoose.model<ProductEvent>(ProductPrefix + aggregationType, new mongoose.Schema({
  ...EventBaseSchema,
  quantity: Number,
  name: String,
  tags: [String],
  with: new mongoose.Schema({
    quantity: Number,
    amount: Number,
    name: String,
    cause: String,
  })
}, { safe: true, validateBeforeSave: true } as mongoose.SchemaOptions))

const map: { [key: string]: mongoose.Model<ProductEvent, {}> } = {}

export const ProductAggregate: (id: string) => mongoose.Model<ProductEvent> = (id: string) => {
  const found = map[id];
  const r = found ?? (map[id] = GetProductAggregate(id));
  return r;
}