import { Mongoose, default as mongoose } from "mongoose";
import { rootCertificates } from "tls";
import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  OperationId,
} from "tsoa";
import { OrderDto, OrderEvent } from "./Order";
import { ErrorResponse, isErrorResponse, Orders } from "./Orders";

export const errorResponse = (p: { message: string }) => ({ error: true, message: p.message }) as ErrorResponse;

@Route("order")
export class OrderController extends Controller {

  @Post("send")
  public async send(
    @Body()
    data: {
      id: string
    }
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    const r = (await Orders.SendOrderCommand({ id: data.id,  type: 'SendOrderCommand' }));
    if (isErrorResponse(r)) return r;
    
    return { error: true, message: 'Unknown error' };
  }

  @Post("add")
  public async add(
    @Body()
    vm: Orders.ViewModel
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    const r = (await Orders.CreateOrderCommand({ ...vm, type: 'CreateOrderCommandEvent' }));
    if (isErrorResponse(r)) return r;
    return { error: true, message: 'Unknown error' };
  }
  
  @Post("pay")
  public async pay(
    @Query('amount')amount: number,
    @Query('id')id: string,
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    const r = (await Orders.PayOrderCommand({ id, amount, type: 'PayForOrderCommand' }));
    if (r)
      return r as ErrorResponse;

    return { error: true, message: 'Unknown error' };
  }

  @Get("all")
  public async all(): Promise<ErrorResponse | OrderDto[]> {
    return await Orders.QueryAllOrders({});
  }
}
