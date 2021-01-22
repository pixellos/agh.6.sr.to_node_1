import { Component, OnInit } from '@angular/core';
import {DefaultService as ProductHttpClient} from "src/client-product/api/default.service";
import {PreviewButtonComponent} from "../preview-button/preview-button.component";
import {GridOptions} from "ag-grid-community";
import {Router} from "@angular/router";
import {Product} from "../model/product";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  addProductTab: boolean
  product: Product = new Product('', '', 0, 0, '')

  adminProductColumnDefs = [
    {headerName: 'Id', field: 'id', maxWidth: 500 , sortable: true, filter: true },
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true },
    {headerName: 'Cena', maxWidth: 200, field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', maxWidth: 150, field: 'quantity', sortable: true, filter: true},
    {headerName: 'Przegladaj', maxWidth: 150,  cellRendererFramework: PreviewButtonComponent}
  ];

  adminProductData = []
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Prosze czekac trwa ladowanie danych</span>';
  adminProductOptions: GridOptions = {suppressCellSelection: true};

  constructor(private router: Router, private httpClient:ProductHttpClient) { }

  ngOnInit() {
    this.httpClient.listAll().subscribe(response => {
      this.adminProductData = response.data
    });
  }

  toggleAddProductTab() {
    this.addProductTab = !this.addProductTab;
  }

  add() {
    this.httpClient.create({
      shortDescription: this.product.shortDescription,
      price: this.product.price,
      quantity: this.product.quantity,
      description: this.product.description,
      image: this.product.image,
      tags: []})
      .subscribe(response => {})

    this.product = new Product('', '', 0, 0, '')
  }

}
