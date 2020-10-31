import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { Connection } from "./Connection";
import { defaultOrder, defaultOrderDto, OrderAggregate, OrderDto, OrderEvent, OrderPrefix, OrderReducer } from "./Order";
import { errorResponse } from "./OrderController";

export type ErrorResponse = {
  error: true,
  message: string
}

export namespace Orders {
  export type ViewModel = { name: string; quantity: number; productId: string; };
  export type CreateOrderCommandEvent = ViewModel & { type: 'CreateOrderCommandEvent'; };

  export async function GetOrder(id: string) {
    const aggregate = OrderAggregate(id);
    const doesExist = await aggregate.exists({});
    if (!doesExist) {
      return errorResponse({ message: `Order with id ${id} does not exists.` });
    }
    return aggregate;
  }

  export async function SendOrderCommand(props: { id: string, type: 'SendOrderCommand' }) {
    const order = await GetOrder(props.id);
    if ('error' in order) {
      return order;
    }
    const data = await FlatMapEvents(order, props.id);
    if (data.status == 'Started') {
      const data = await order.find({});
      const previousRevision = Math.max(...data.map(x => x.revision.valueOf()));
      const createResult = await order.create({
        who: 'admin',
        previousRevision: previousRevision,
        revision: previousRevision+ 1,
        what: 'Sent',
        when: new Date(),
        with: {}
      })
      if (createResult.errors) {
        console.log(createResult.errors);
        return errorResponse({ message: 'Order cannot be saved. Try again.' });
      }
    }
    else {
      return errorResponse({message: 'State is invalid'})
    }
  }


  export async function CreateOrderCommand(p: CreateOrderCommandEvent) {
    const id = v4();
    const aggregate = OrderAggregate(id);
    const doesExist = await aggregate.exists({});
    if (doesExist) {
      return errorResponse({ message: `Order with id ${id} already exists.` });
    }
    const createResult = await aggregate.create(
      {
        who: 'admin',
        previousRevision: 0,
        revision: 0,
        what: 'Issued',
        when: new Date(),
        with: {
          name: p.name,
          quantity: p.quantity,
          productId: p.productId
        }
      });
    if (createResult.errors) {
      console.log(createResult.errors);
      return errorResponse({ message: 'Order cannot be saved. Try again.' });
    }
  }

  export async function FlatMapEvents(m: Model<OrderEvent, {}>, id: string) {
    const items = await m.find({});
    const result = items.reduce(OrderReducer, defaultOrderDto) as OrderDto;
    result.id = id;
    return result;
  }

  export async function QueryAllOrders({ }) {
    const connection = await Connection.connect();
    const orders = await Connection.GetAggregatesIds(connection, OrderPrefix);
    const result = await Promise.all(orders.map(o => ({ order: OrderAggregate(o), id: o }))
      .map(x => FlatMapEvents(x.order, x.id)));
    return result;
  }
}
