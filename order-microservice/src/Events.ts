import { isTemplateExpression } from "typescript";
import { Connection } from "./Connection";
import { OrderAggregate, OrderEvent, OrderEventDto, OrderPrefix } from "./Order";
import { errorResponse, okResponse } from "./OrderController";
import { ErrorResponse } from "./Orders";

// Todo: Move to events microservice

export namespace Events {
  export async function InspectEventsQuery(id: string, type: 'Order'): Promise<ErrorResponse<OrderEventDto[]>> {
    if (type == 'Order') {
      const connection = await Connection.connect();
      const order = OrderAggregate(id);
      const items = await order.find({});
      return okResponse(items);
    }

    return errorResponse<OrderEventDto[]>({message: 'Type is not known'});
  }
}
