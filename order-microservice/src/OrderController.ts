import { Mongoose, default as mongoose } from "mongoose";
import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  Request
} from "tsoa";
import { OrderDto, OrderEvent, OrdersDto } from "./Order";
import { ErrorResponse, isErrorResponse, Orders } from "./Orders";

export const errorResponse = <T = {}>(p: { message: string }) => ({ error: true, message: p.message }) as ErrorResponse<T>;
export const okResponse = <T>(data: T) => ({ error: false, data: data }) as ErrorResponse<T>;

type Empty = {};

@Route("order")
export class OrderController extends Controller {

  @Post("send")
  public async send(
    @Body()
    data: {
      id: string
    }
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const r = (await Orders.SendOrderCommand({ id: data.id,  type: 'SendOrderCommand' }));
    if (isErrorResponse(r)) return r;
    
    return { error: true, message: 'Unknown error' };
  }

  @Post("add")
  public async add(
    @Body()
    vm: Orders.ViewModel
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const r = (await Orders.CreateOrderCommand({ ...vm, type: 'CreateOrderCommandEvent' }));
    if (isErrorResponse(r)) return r;
    return { error: true, message: 'Unknown error' };
  }
  
  @Post("pay")
  public async pay(
    @Query('amount')amount: number,
    @Query('id')id: string,
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const r = (await Orders.PayOrderCommand({ id, amount, type: 'PayForOrderCommand' }));
    if (r)
      return r as ErrorResponse<{}>;

    return { error: true, message: 'Unknown error' };
  }

  @Get("all")
  public async all(@Request() request: R): Promise<DataOrError> {
    const user = request.user.sub;
    return await Orders.QueryAllOrders({});
  }
}

export type DataOrError = ErrorResponse<Empty> | OrdersDto;

type R = {
  user: {
    sub: string
  }
}
