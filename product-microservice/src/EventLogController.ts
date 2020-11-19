import {
  Controller,
  Get,


  Route
} from "tsoa";
import { EventBase } from "./EventBase";
import { Events } from "./Events";
import { ErrorResponse } from "./Products";


@Route("events")
export class EventLogController extends Controller {
  @Get("list/:type/:id")
  public async list(id: string, type: 'Product'): Promise<ErrorResponse | {}[]> {
    return await Events.InspectEventsQuery(id, type);
  }
}
