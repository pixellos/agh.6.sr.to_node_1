import { Connection } from "./Connection";
import { IssuedEvent, OrderAggregate, OrderEventDto, OrderEventUnion } from "./Order";
import { errorResponse, ErrorResponse, okResponse } from "./../../commons-microservice/src/CommonHelpers";

// Todo: Move to events microservice

export namespace Events {
  export async function InspectEventsQuery(id: string, type: 'Order'): Promise<ErrorResponse<OrderEventUnion[]>> {
    if (type == 'Order') {
      const connection = await Connection.connect();
      const order = OrderAggregate(id);
      const items = await order.find({});
      return okResponse(items.map(x=> x));
    }

    return errorResponse<OrderEventUnion[]>({message: 'Type is not known'});
  }
}
