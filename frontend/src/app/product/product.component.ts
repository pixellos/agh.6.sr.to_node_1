import {Component, OnInit} from '@angular/core';
import {DefaultService as ProductHttpClient} from "src/client-product/api/default.service";
import {PreviewButtonComponent} from "../preview-button/preview-button.component";
import {BuyButtonComponent} from "../buy-button/buy-button.component";
import {GridOptions} from "ag-grid-community";
import {Router} from "@angular/router";
import {CartButtonComponent} from "../cart-button/cart-button.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productColumnDefs = [
    {headerName: 'Id', field: 'id', maxWidth: 100 , sortable: true, filter: true },
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true },
    {headerName: 'Cena', maxWidth: 200, field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', maxWidth: 150, field: 'quantity', sortable: true, filter: true},
    {headerName: 'Koszyk', maxWidth: 150, cellRendererFramework: CartButtonComponent},
    {headerName: 'Kup', maxWidth: 150,  cellRendererFramework: BuyButtonComponent},
    {headerName: 'Przegladaj', maxWidth: 150,  cellRendererFramework: PreviewButtonComponent}
  ];

  productData = []
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Prosze czekac trwa ladowanie danych</span>';
  productOptions: GridOptions = {suppressCellSelection: true};

  constructor(private router: Router, private httpClient:ProductHttpClient) { }

  ngOnInit(): void {
    this.httpClient.listAll().subscribe(response => {
      this.productData = response.data
    });
  }

  buyProcess() {
    this.router.navigateByUrl('/buy');
  };

}
