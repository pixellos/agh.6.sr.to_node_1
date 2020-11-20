
import mongoose from 'mongoose';
import { EventBase, EventBaseSchema, OrderAction } from './EventBase';

export type OrderEventUnion = (
  | {
    what: 'Issued'
    with: Order
  }
  | { what: 'Sent', with: {} }
  | { what: 'Paid', with: { amount: number } }
  | { what: 'Returned', with: { cause: string } }
);

export type OrderEventDto = EventBase & {
  what: OrderAction
} & OrderEventUnion;

export type OrderEvent = mongoose.Document & OrderEventDto;

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

export type OrdersDto = { values: OrderDto[] } ;

export type OrderDto = Order & {
  id?: string
  status: 'Started' | 'Sent' | 'Derived' | 'Returned'
};

export const defaultOrderDto: OrderDto = {
  ...defaultOrder,
  status: 'Started'
}

export function OrderReducer(p: OrderDto, event: OrderEvent) {
  switch (event.what) {
    case 'Issued':
      const copy = Object.keys(defaultOrder)
        .map(x => x as keyof Order)
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? x[key] }), p as Partial<Order>);
      const result = copy as OrderDto;
      result.status = 'Started';
      result.id = event.id;
      return result;
    case 'Sent':
      return { ...p, status: 'Sent' } as OrderDto;
    default:
      return defaultOrderDto;
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
    quantity: Number,
    amount: Number,
    name: String,
    productId: String,
    cause: String,
  })
}, { safe: true, validateBeforeSave: true } as mongoose.SchemaOptions))

const map: { [key: string]: mongoose.Model<OrderEvent, {}> } = {}

export const OrderAggregate: (id: string) => mongoose.Model<OrderEvent> = (id: string) => {
  const found = map[id];
  const r = found ?? (map[id] = GetOrderAggregate(id));
  return r;
}