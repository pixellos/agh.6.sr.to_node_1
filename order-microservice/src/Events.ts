import { isTemplateExpression } from "typescript";
import { Connection } from "./Connection";
import { OrderAggregate, OrderPrefix } from "./Order";
import { errorResponse } from "./OrderController";

// Todo: Move to events microservice

export namespace Events {
  export async function InspectEventsQuery(id: string, type: 'Order') {
    if (type == 'Order') {
      const connection = await Connection.connect();
      const order = OrderAggregate(id);
      const items = await order.find({});
      return items;
    }

    return errorResponse({message: 'Type is not known'});
  }
}
