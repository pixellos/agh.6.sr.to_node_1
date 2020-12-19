import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  Path,
  OperationId,
} from "tsoa";
import { Empty, errorResponse, ErrorResponse, isErrorResponse, okResponse } from "../../commons-microservice/src/CommonHelpers";
import { Product, ProductDto, ProductEvent } from "./Product";
import { Products } from "./Products";


@Route("product")
export class ProductController extends Controller {

  @Post("/")
  public async create(
    @Body()
    product: Products.ViewModel
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    console.log("Entered create");
    const r = (await Products.CreateProductCommand({ ...product, type: 'CreateProductCommand' }));
    return r;
  }

  @Get("{id}/get")
  public async getById(
    @Path() id: string
  ): Promise<ErrorResponse<Product>> {
    // Todo: Pattern mediator.
    const r = (await Products.GetProduct(id));
    if (isErrorResponse(r))
      return r;
    
    return okResponse(r.data.data)
  }

  @Post("{id}/add")
  public async add(
    @Path() id: string,
    @Query('quantity') quantity: number,
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    return (await Products.AddProductCommand({ id, quantity, type: 'AddProductCommand' }));
  }

  @Post("{id}/buy")
  public async buy(
    @Path() id: string,
    @Query('quantity') quantity: number,
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    return (await Products.BuyProductCommand({ id, quantity, type: 'BuyProductCommand' }));
  }

  @Get("all")
  @OperationId('listAll')
  public async listAll(): Promise<ErrorResponse<ProductDto[]>> {
    return await Products.QueryAllProducts({});
  }
}
