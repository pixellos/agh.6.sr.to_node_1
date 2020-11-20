import {
  Controller,
  Get,
  Route
} from "tsoa";
import { Events } from "./Events";
import {  OrderEventDto, OrderEventUnion } from "./Order";
import { ErrorResponse } from "./Orders";


@Route("events")
export class EventLogController extends Controller {
  @Get("list/:type/:id")
  public async list(id: string, type: 'Order'): Promise<ErrorResponse<OrderEventUnion[]>> {
    return await Events.InspectEventsQuery(id, type);
  }
}

