import { Mongoose, default as mongoose } from "mongoose";
import { rootCertificates } from "tls";
import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  Path,
} from "tsoa";
import { ProductDto, ProductEvent } from "./Product";
import { ErrorResponse, isErrorResponse, Products } from "./Products";

export const errorResponse = (p: { message: string }) => ({ error: true, message: p.message }) as ErrorResponse;

@Route("product")
export class ProductController extends Controller {

  @Post()
  public async create(
    @Body()
    product: Products.ViewModel
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    console.log("Entered create");
    const r = (await Products.CreateProductCommand({ ...product,  type: 'CreateProductCommand' }));
    if (r)
      return r as ErrorResponse;
    
    return { error: true, message: 'Unknown error' };
  }

  @Get("{id}")
  public async get(
    @Path() id: string
  ): Promise<ErrorResponse | ProductDto> {
    // Todo: Pattern mediator.
    debugger;
    const r = (await Products.GetProduct( id ));
    if (r)
      return r as ErrorResponse;
    return { error: true, message: 'Unknown error' };
  }

  @Post("{id}/add")
  public async add(
    @Path() id: string,
    @Query('quantity') quantity: number,
  ): Promise<ErrorResponse> {
    // Todo: Pattern mediator.
    const r = (await Products.AddProductCommand({ id, quantity, type: 'AddProductCommand' }));
    if (r)
      return r as ErrorResponse;
    return { error: true, message: 'Unknown error' };
  }
  
  @Post("{id}/buy")
  public async buy(
    @Path() id: string,
    @Query('quantity') quantity: number,
  ): Promise<ErrorResponse | string> {
    // Todo: Pattern mediator.
    const r = (await Products.BuyProductCommand({ id, quantity, type: 'BuyProductCommand' }));
    if (r)
      return r as ErrorResponse;

    return { error: true, message: 'Unknown error' };
  }

  @Get()
  public async list(): Promise<ErrorResponse | ProductDto[]> {
    return await Products.QueryAllProducts({});
  }
}
