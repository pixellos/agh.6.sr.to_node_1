import { Model } from "mongoose";
import {
  Controller,
  Get,
  Post,
  Body,
  Route,
  Query,
  Path,
  OperationId,
  Request,
} from "tsoa";
import { Empty, errorResponse, ErrorResponse, isErrorResponse, OkResponse, okResponse, UserRequest } from "../../commons-microservice/src/CommonHelpers";
import { Product, ProductDto, ProductEvent } from "./Product";
import { Products } from "./Products";
import {CreateOrder} from "./Order";


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

  @Post("/buy")
  public async buy(
    @Body() basket: {id: string, quantity: number}[],
    @Request() request: UserRequest
  ): Promise<ErrorResponse<string>> {
    // Todo: Pattern mediator.
    console.log("Entered buy");
    const user = request?.user?.sub ?? 'test';
    console.log("User: ", user);
    for (const product of basket) {
      // Subtract requested products from inventory. OK if it goes into negatives.
      await Products.AddProductCommand({ id: product.id, quantity: -product.quantity, type: 'AddProductCommand' })
    }

    // Create order:
    const r = Promise
      .all(basket.map(async (item) => (await Products.GetProduct(item.id))))
      .then((e) => {
        let productsResolved = e.map((e) => e as OkResponse< {Product: Model<ProductEvent, {}>, data: ProductDto}>);
        let productsResolvedMapped = productsResolved.map(e => 
          e.data.data as Product
          );
        return productsResolvedMapped;
        
      })
      .then((e) => CreateOrder(user, e));
      return r.then((e) => okResponse(e))
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
/*&
  @Post("{id}/buy")
  public async buy(
    @Path() id: string,
    @Query('quantity') quantity: number,
  ): Promise<ErrorResponse<Empty>> {
    // Todo: Pattern mediator.
    return (await Products.BuyProductCommand({ id, quantity, type: 'BuyProductCommand' }));
  }
  */

  @Get("/all")
  @OperationId('listAll')
  public async listAll(): Promise<ErrorResponse<ProductDto[]>> {
    return await Products.QueryAllProducts({});
  }
}
