import { Component, OnInit } from '@angular/core';
import {PreviewButtonComponent} from "../preview-button/preview-button.component";
import {BuyButtonComponent} from "../buy-button/buy-button.component";
import {GridOptions} from "ag-grid-community";
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {CartButtonComponent} from "../cart-button/cart-button.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  ProductColumnDefs = [
    {headerName: 'Id', field: 'id', maxWidth: 100 , sortable: true, filter: true },
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true },
    {headerName: 'Cena', maxWidth: 200, field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', maxWidth: 150, field: 'quantity', sortable: true, filter: true},
    {headerName: 'Koszyk', maxWidth: 150, cellRendererFramework: CartButtonComponent},
    {headerName: 'Kup', maxWidth: 150,  cellRendererFramework: BuyButtonComponent},
    {headerName: 'Przegladaj', maxWidth: 150,  cellRendererFramework: PreviewButtonComponent}
  ];
  ProductRowData: Product[] = [
    {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 4, shortDescription: "Monitor Samsung 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 5, shortDescription: "Monitor Toshiba 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 6, shortDescription: "Monitor Toshiba 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 7, shortDescription: "Monitor Toshiba 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 8, shortDescription: "Monitor Toshiba 30'", price: 1300, quantity: 100, description: "TODO"},
  //
    {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 4, shortDescription: "Monitor Samsung 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 5, shortDescription: "Monitor Toshiba 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 6, shortDescription: "Monitor Toshiba 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 7, shortDescription: "Monitor Toshiba 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 8, shortDescription: "Monitor Toshiba 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 4, shortDescription: "Monitor Samsung 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 5, shortDescription: "Monitor Toshiba 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 6, shortDescription: "Monitor Toshiba 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 7, shortDescription: "Monitor Toshiba 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 8, shortDescription: "Monitor Toshiba 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 4, shortDescription: "Monitor Samsung 30'", price: 1300, quantity: 100, description: "TODO"},
    {id: 5, shortDescription: "Monitor Toshiba 21'", price: 500, quantity: 20, description: "TODO"},
    {id: 6, shortDescription: "Monitor Toshiba 23'", price: 700, quantity: 40, description: "TODO"},
    {id: 7, shortDescription: "Monitor Toshiba 26'", price: 900, quantity: 70, description: "TODO"},
    {id: 8, shortDescription: "Monitor Toshiba 30'", price: 1300, quantity: 100, description: "TODO"},
  ];

  productOptions: GridOptions = {suppressCellSelection: true};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buyProcess() {
    this.router.navigateByUrl('/buy');
  };

}
