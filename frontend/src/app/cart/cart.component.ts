import {Component, OnInit} from "@angular/core";
import {ColumnApi, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {DeleteButtonCartComponent} from "../delete-button-cart/delete-button-cart.component";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;

  cartColumnDefs: any = [
    {headerName: 'Id', field: 'id', maxWidth: 100, sortable: true, filter: true},
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true},
    {headerName: 'Cena', field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', field: 'quantity', sortable: true, filter: true},
    {headerName: 'Usun', maxWidth: 150, cellRendererFramework: DeleteButtonCartComponent},
  ];

  cartRowData: Product[] = [];

  cartOptions: GridOptions = {suppressCellSelection: true};

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.cartRowData = this.cartService.products;
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
    this.router.navigate(['buy'], { state: { products: this.cartRowData } });
  }

  backToProducts() {
    this.router.navigateByUrl('/products');
  }


}
