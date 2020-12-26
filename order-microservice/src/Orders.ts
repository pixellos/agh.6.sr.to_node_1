import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { errorResponse, isErrorResponse, okResponse } from '../../commons-microservice/src/CommonHelpers';
import { Connection } from "./Connection";
import { defaultOrderDto, ExtendedOrderDto, OrderAggregate, OrderDto, OrderEvent, OrderEventUnion, OrderPrefix, OrderProduct, OrderReducer } from "./Order";

export namespace Orders {
  export type ViewModel = { name: string; quantity: number; products: OrderProduct[]; user: string };
  export type CreateOrderCommandEvent = ViewModel & { type: 'CreateOrderCommandEvent'; };

  export async function GetOrder(id: string) {
    const aggregate = OrderAggregate(id);
    const doesExist = await aggregate.exists({});
    if (!doesExist) {
      return errorResponse({ message: `Order with id ${id} does not exists.` });
    }
    return aggregate;
  }

  export async function GetOrderWithValidation(props: { id: string, allowedStates: OrderEventUnion['what'][] }) {
    const order = await GetOrder(props.id);
    if (isErrorResponse(order))
      return order;

    const data = await FlatMapEvents(order, props.id);
    if (props.allowedStates.indexOf(data.status as OrderEventUnion['what']) === -1) {
      return errorResponse({ message: `Current state of event ${data.status} is not assignable to ${props.allowedStates.join(', ')}` });
    }
    return { order, data };
  }

  export async function Save(order: Model<OrderEvent>, partial: OrderEventUnion) {
    const data = await order.find({});
    const previousRevision = Math.max(...data.map(x => x.revision.valueOf()));
    const createResult = await order.create({
      previousRevision: previousRevision,
      revision: previousRevision + 1,
      when: new Date(),
      ...partial,
    })
    if (createResult === undefined)
      return errorResponse({ message: 'Order cannot be saved. Try again.' });
    return okResponse(previousRevision + 1);
  }

  export async function SendOrderCommand(props: { id: string, type: 'SendOrderCommand', user: string }) {
    const o = await GetOrderWithValidation({ id: props.id, allowedStates: ['Paid'] })
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, order } = o;
    await Save(order, { what: 'Sent', with: {}, who: props.user })
  }

  export async function PayOrderCommand(props: { id: string, amount: number, method: string, type: 'PayForOrderCommand', user: string }) {
    const o = await GetOrderWithValidation({ id: props.id, allowedStates: ['Issued'] })
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, order } = o;
    await Save(order, { what: 'Paid', with: { amount: props.amount, method: props.method }, who: props.user })
  }

  export async function RefundCommand(props: { id: string, cause: string, type: 'RefundOrderCommand', user: string }) {
    const o = await GetOrderWithValidation({ id: props.id, allowedStates: ['Paid'] })
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, order } = o;
    await Save(order, { what: 'RefundRequested', with: { refundCause: props.cause }, who: props.user })
  }

  export async function AcceptRefundCommand(props: { id: string, cause: string, type: 'AcceptRefundOrderCommand', user: string }) {
    const o = await GetOrderWithValidation({ id: props.id, allowedStates: ['Paid'] })
    if (isErrorResponse(o)) {
      return o;
    }
    const { data: item, order } = o;
    await Save(order, { what: 'Refunded', with: { cause: props.cause }, who: props.user })
  }

  export async function CreateOrderCommand(p: CreateOrderCommandEvent) {
    const id = v4();
    const aggregate = OrderAggregate(id);
    const doesExist = await aggregate.exists({});
    if (doesExist) {
      return errorResponse({ message: `Order with id ${id} already exists.` });
    }
    const save = await Save(aggregate, {
      what: 'Issued',
      with: {
        name: p.name,
        quantity: p.quantity,
        products: p.products,
      },
      who: p.user
    })
    if (isErrorResponse(save))
      return errorResponse({ message: 'Order cannot be saved. Try again.' });
    return okResponse(save);
  }

  export async function FlatMapEvents(m: Model<OrderEvent, {}>, id: string) {
    const items = await m.find({});
    const result = items.reduce(OrderReducer, defaultOrderDto) as OrderDto;
    result.id = id;
    return result;
  }

  function ConvertToViewModel(dto: OrderDto) {
    const result: ExtendedOrderDto = {
      ...dto,
      totalPrice: dto.products?.reduce((acc, x) => acc + x.totalPrice, 0),
      amountOfProducts:  dto.products?.reduce((acc, x) => acc + x.quantity, 0),
    }
    return result;
  }


  export async function QueryAllOrders({ }) {
    const connection = await Connection.connect();
    const orders = await Connection.GetAggregatesIds(connection, OrderPrefix);
    const result = await Promise.all(orders.map(o => ({ order: OrderAggregate(o), id: o }))
      .map(x => FlatMapEvents(x.order, x.id)))
      ;
    return okResponse(result.map(ConvertToViewModel));
  }
}
