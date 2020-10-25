
import mongoose, { Mongoose } from 'mongoose';
import { EventBase, EventBaseSchema, OrderAction } from './EventBase';

export type OrderEvent = mongoose.Document & EventBase & {
  what: OrderAction
} & ({
  what: 'Issued'
  with: { name: string, productId: string, quantity: number }
} | {what: 'Sent', with : {}})

export type Order = {
  quantity: number;
  name: string;
  creationDate: Date;
  tags: string[];
}

export const defaultOrder: Order = {
  quantity: 0,
  name: '' as string,
  creationDate: new Date(),
  tags: [] as string[]
}

export function ProductReducer(p: Order, event: OrderEvent) {
  switch (event.what) {
    case 'Issued':
      const quantityAfter = p.quantity - event.with.quantity;
      const result = { ...p, quantity: quantityAfter } as Order;
      return result;
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