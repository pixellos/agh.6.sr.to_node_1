import { Connection } from "./Connection";
import { ProductAggregate, ProductEventUnion, ProductPrefix } from "./Product";
import { ErrorResponse, errorResponse, isErrorResponse, okResponse } from "./../../commons-microservice/src/CommonHelpers";

// Todo: Move to events microservice

export namespace Events {
  export async function InspectEventsQuery(id: string, type: 'Product')
    : Promise<ErrorResponse<ProductEventUnion[]>> {
    if (type == 'Product') {
      const connection = await Connection.connect();
      const product = ProductAggregate(id);
      const items = await product.find({});
      return okResponse(items.map(x => x as ProductEventUnion));
    }

    return errorResponse({ message: 'Type is not known' });
  }
}
