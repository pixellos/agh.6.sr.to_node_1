import {
  Controller,
  Get,


  Route
} from "tsoa";
import { EventBase } from "./EventBase";
import { Events } from "./Events";
import { ErrorResponse } from "./Orders";


@Route("events")
export class EventLogController extends Controller {
  @Get("list/:type/:id")
  public async list(id: string, type: 'Order'): Promise<ErrorResponse | {}[]> {
    return await Events.InspectEventsQuery(id, type);
  }
}
