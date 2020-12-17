import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  Request
} from "tsoa";
import { Empty, ErrorResponse, isErrorResponse, UserRequest } from "../../commons-microservice/src/CommonHelpers";
import { OrderDto } from "./Order";
import { Orders } from "./Orders";

@Route("order")
export class OrderController extends Controller {

  @Post("send")
  public async send(
    @Body()
    data: {
      id: string
    },
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.SendOrderCommand({ id: data.id, type: 'SendOrderCommand', user: user }));
    if (isErrorResponse(r)) return r;

    return { error: true, message: 'Unknown error' };
  }

  @Post("add")
  public async add(
    @Body()
    vm: Orders.ViewModel,
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.CreateOrderCommand({ ...vm, type: 'CreateOrderCommandEvent', user: user }));
    if (isErrorResponse(r)) return r;
    return { error: true, message: 'Unknown error' };
  }

  @Post("pay")
  public async pay(
    @Query('amount') amount: number,
    @Query('method') method: string,
    @Query('id') id: string,
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.PayOrderCommand({ id, amount, method: method, type: 'PayForOrderCommand', user: user }));
    if (r)
      return r as ErrorResponse<{}>;

    return { error: true, message: 'Unknown error' };
  }

  @Post("refund")
  public async refund(
    @Query('cause') cause: string,
    @Query('id') id: string,
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.RefundCommand({ id, cause, type: 'RefundOrderCommand', user: user }));
    if (r)
      return r as ErrorResponse<{}>;

    return { error: true, message: 'Unknown error' };
  }

  @Post("acceptRefund")
  public async acceptRefund(
    @Query('cause') cause: string,
    @Query('id') id: string,
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    // TODO : Validate if admin
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.AcceptRefundCommand({ id, cause, type: 'AcceptRefundOrderCommand', user: user }));
    if (r)
      return r as ErrorResponse<{}>;

    return { error: true, message: 'Unknown error' };
  }

  @Get("all")
  public async all(@Request() request: UserRequest): Promise<ErrorResponse<OrderDto[]>> {
    const user = request?.user?.sub ?? 'test';
    return await Orders.QueryAllOrders({});
  }
}
