import {
  Controller,
  Get,
  Route
} from "tsoa";
import { ErrorResponse } from "../../commons-microservice/src/CommonHelpers";
import { Events } from "./Events";
import {  OrderEventDto, OrderEventUnion } from "./Order";


@Route("events")
export class EventLogController extends Controller {
  @Get("list/:type/:id")
  public async list(id: string, type: 'Order'): Promise<ErrorResponse<OrderEventUnion[]>> {
    return await Events.InspectEventsQuery(id, type);
  }
}

