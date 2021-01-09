import {Component, OnInit} from "@angular/core";
import {ColumnApi, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {DeleteButtonCartComponent} from "../delete-button-cart/delete-button-cart.component";
import {CartService} from "../cart.service";
import {PreviewButtonComponent} from "../preview-button/preview-button.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;

  cartColumnDefs: any = [
    {headerName: 'Id', field: 'id', maxWidth: 200, sortable: true, filter: true},
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true},
    {headerName: 'Cena', field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', field: 'quantity', sortable: true, filter: true},
    {headerName: 'Przegladaj', maxWidth: 150, cellRendererFramework: PreviewButtonComponent},
    {headerName: 'Usun', maxWidth: 150, cellRendererFramework: DeleteButtonCartComponent}
  ];

  cartData: Product[] = [];

  overlayNoRowsTemplate = '<span class="ag-overlay-loading-center">Koszyk pusty</span>';

  cartOptions: GridOptions = {suppressCellSelection: true};

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.cartData = this.cartService.products;
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      }, 300);
    });
  }

  buyCart() {
    this.cartService.products = []
    this.router.navigate(['buy'], { state: { products: this.cartData } });
  }

  backToProducts() {
    this.router.navigateByUrl('/products');
  }


}
