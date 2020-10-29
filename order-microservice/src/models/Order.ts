
import e from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { EventBase, EventBaseSchema, OrderAction } from './EventBase';

export type OrderEvent = mongoose.Document & EventBase & {
  what: OrderAction
} & ({
  what: 'Issued'
  with: Order 
} | {what: 'Sent', with : {}})

export type Order = {
  quantity: number;
  name: string;
  productId: string, 
}

export const defaultOrder: Order = {
  quantity: 0,
  name: '' as string,
  productId: '',
}

export function OrderReducer(p: Order, event: OrderEvent) {
  switch (event.what) {
    case 'Issued':
      const result = Object.keys(defaultOrder).map(x => x as keyof Order).reduce((x, key) => ({...x, [key]: (event.with[key])}), p as Partial<Order>);
      return result as Order;
      break;
    default:
      return defaultOrder;
      break;
  }
}

export const OrderPrefix = "order-";

const GetOrderAggregate = (aggregationType: string) => mongoose.model<OrderEvent>(OrderPrefix + aggregationType, new mongoose.Schema({
  ...EventBaseSchema,
  quantity: Number,
  name: String,
  tags: [String],
  with: new mongoose.Schema({
    quantity: Number
  })
}, { safe: true, validateBeforeSave: true } as mongoose.SchemaOptions))

const map: { [key: string]: mongoose.Model<OrderEvent, {}> } = {}

export const OrderAggregate = (id: string) => {
  const found = map[id];
  const r = found ?? (map[id] = GetOrderAggregate(id));
  return r;
}