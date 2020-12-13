import {
  Controller,
  Get,
  Route
} from "tsoa";
import { Events } from "./Events";
import { ErrorResponse } from "./../../commons-microservice/src/CommonHelpers";
import { ProductEventUnion } from "./Product";


@Route("events")
export class EventLogController extends Controller {
  @Get("list/:type/:id")
  public async list(id: string, type: 'Product'): Promise<ErrorResponse<ProductEventUnion[]>> {
    const errors = await Events.InspectEventsQuery(id, type);

    return errors;
  }
}
