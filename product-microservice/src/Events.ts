import { isTemplateExpression } from "typescript";
import { Connection } from "./Connection";
import { ProductAggregate, ProductPrefix } from "./Product";
import { errorResponse } from "./ProductController";

// Todo: Move to events microservice

export namespace Events {
  export async function InspectEventsQuery(id: string, type: 'Product') {
    if (type == 'Product') {
      const connection = await Connection.connect();
      const product = ProductAggregate(id);
      const items = await product.find({});
      return items;
    }

    return errorResponse({message: 'Type is not known'});
  }
}
