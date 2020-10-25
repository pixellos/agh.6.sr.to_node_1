import { v4 } from 'uuid';
import { Connection } from "./Connection";
import { OrderAggregate, OrderPrefix } from "./Order";
import { errorResponse } from "./OrderController";



export type ErrorResponse = {
  error: true,
  message: string
}


export namespace Orders {
  export type ViewModel = { name: string; quantity: number; productId: string; };
  export type CreateOrderCommandEvent = ViewModel & { type: 'CreateOrderCommandEvent'; };

  export async function CreateOrderCommand(p: CreateOrderCommandEvent) {
    const id = v4();
    const aggregate = OrderAggregate(id);
    const doesExist = await aggregate.exists({});
    if (doesExist) {
      return errorResponse({ message: 'Order already exists.' });
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


  export async function QueryAllOrders({ }) {
    const connection = await Connection.connect();
    const orders = await Connection.GetAggregatesIds(connection, OrderPrefix);
    return orders;
  }

}
