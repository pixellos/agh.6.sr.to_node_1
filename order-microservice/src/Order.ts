
import mongoose from 'mongoose';
import { EventBase, OrderAction, EventBaseSchema } from "../../commons-microservice/src/EventBase";
export type UserBaseEvent = { who: string };

export type SentEvent = UserBaseEvent & { what: 'Sent', with: {} };

export type IssuedEvent = UserBaseEvent & {
  what: 'Issued'
  with: Order
}

export type AddressDto = {
  street: string;
  country: string;
  postalCode: string;
  paymentMethod: string;
}

export type PaidDto = {
  amount: number,
  method: string
}

export type AddressSetEvent = UserBaseEvent & {
  what: 'AddressSet', with: AddressDto
}
export type RequestRefundDto = { refundCause: string };
export type RefundedDto = { cause: string };

export type PaidEvent = UserBaseEvent & { what: 'Paid', with: PaidDto }
export type RequestRefuntEvent = UserBaseEvent & { what: 'RefundRequested', with: RequestRefundDto };
export type RefundEvent = UserBaseEvent & { what: 'Refunded', with: RefundedDto };

export type OrderEventUnion =
  | AddressSetEvent
  | IssuedEvent
  | SentEvent
  | PaidEvent
  | RefundEvent
  | RequestRefuntEvent

export type OrderEventDto = EventBase & {
  what: OrderAction
} & UserBaseEvent & OrderEventUnion;

export type OrderEvent = mongoose.Document & OrderEventDto;

export type OrderProduct = {
  name: string,
  quantity: number,
  totalPrice: number,
  price: number,
  shortDescription: string,
  description: string,
  image: string
}

export type Order = {
  quantity: number;
  name: string;
  products: OrderProduct[];
}

export const defaultOrder: Order = {
  quantity: 0,
  name: '' as string,
  products: [],
}

export type OrdersDto = { values: OrderDto[] };

export type OrderDto = Order & {
  id?: string
  status: 'Issued' | 'AddressSet' | 'Sent' | 'RefundRequested' | 'Refunded' | 'Paid'
};

export type ExtendedOrderDto = OrderDto & {
  totalPrice: number,
  amountOfProducts: number
}

export const defaultOrderDto: OrderDto = {
  ...defaultOrder,
  status: 'Issued'
}

export function OrderReducer(p: OrderDto, event: OrderEvent) {
  switch (event.what) {
    case 'Issued':
      const copy = Object.keys(defaultOrder)
        .map(x => x as keyof Order)
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? x[key] }), p as Partial<Order>);
      const result = copy as OrderDto;
      result.status = 'Issued';
      result.id = event.id;
      return result;
    case 'AddressSet':
      const address = (['country', 'paymentMethod', 'postalCode', 'street'] as (keyof AddressDto)[])
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? (x as any)?.[key] }), p as Partial<Order>);
      return { ...p, ...address, status: 'AddressSet' } as OrderDto;
    case 'Sent':
      return { ...p, status: 'Sent' } as OrderDto;
    case 'Paid':
      const paid = (['amount', 'method'] as (keyof PaidDto)[])
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? (x as any)?.[key] }), p as Partial<Order>);
      return { ...p, ...paid, status: 'Paid' } as OrderDto
    case 'Refunded':
      const refuned = (['cause'] as (keyof RefundedDto)[])
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? (x as any)?.[key] }), p as Partial<Order>);
      return { ...p, ...refuned, status: 'Refunded' } as OrderDto
    case 'RefundRequested':
      const reqRefund = (['refundCause'] as (keyof RequestRefundDto)[])
        .reduce((x, key) => ({ ...x, [key]: (event.with[key]) ?? (x as any)?.[key] }), p as Partial<Order>);
      return { ...p, ...reqRefund, status: 'RefundRequested' } as OrderDto

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
    products: Array,
    cause: String,
    street: String,
    country: String,
    postalCode: String,
    paymentMethod: String,
    method: String,
    refundCause: String

  })
}, { safe: true, validateBeforeSave: true } as mongoose.SchemaOptions))

const map: { [key: string]: mongoose.Model<OrderEvent, {}> } = {}

export const OrderAggregate: (id: string) => mongoose.Model<OrderEvent> = (id: string) => {
  const found = map[id];
  const r = found ?? (map[id] = GetOrderAggregate(id));
  return r;
}