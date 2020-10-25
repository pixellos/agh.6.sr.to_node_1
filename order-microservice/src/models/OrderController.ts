import { Mongoose, default as mongoose } from "mongoose";
import {
  Controller,
  Get,
  Post,
  Body,
  Route,
} from "tsoa";
import { ErrorResponse, Orders } from "./Orders";

export const errorResponse = (p: { message: string }) => ({ error: true, message: p.message });

@Route("order")
export class OrderController extends Controller {

  @Post("add")
  public async add(
    @Body()
    vm: Orders.ViewModel
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    const r = (await Orders.CreateOrderCommand({ ...vm, type: 'CreateOrderCommandEvent' }));
    if (r)
      return r as ErrorResponse;

    return { error: true, message: 'Unknown error' };
  }

  @Get("/all")
  public async list(): Promise<ErrorResponse | any> {
    return await Orders.QueryAllOrders({});
  }
}


