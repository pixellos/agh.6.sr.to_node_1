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
    }
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const r = (await Orders.SendOrderCommand({ id: data.id, type: 'SendOrderCommand' }));
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
    @Query('amount') amount: number,
    @Query('id') id: string,
    @Request() request: UserRequest
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    const user = request?.user?.sub ?? 'test';
    const r = (await Orders.PayOrderCommand({ id, amount, type: 'PayForOrderCommand', user:user  }));
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
