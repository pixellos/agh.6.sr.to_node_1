import { Component, OnInit } from '@angular/core';
import {Product} from "../model/product";
import {GridOptions} from "ag-grid-community";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  OrderColumnDefs = [
    {headerName: 'Id', field: 'id', maxWidth: 100 , sortable: true, filter: true },
    {headerName: 'Opis', field: 'shortDescription', sortable: true, filter: true },
    {headerName: 'Cena', field: 'price', sortable: true, filter: true},
    {headerName: 'Ilosc', field: 'quantity', sortable: true, filter: true},
  ];
  OrderRowData: Product[] = [
    {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 1, description: "TODO"},
  ];

  orderOptions: GridOptions = {suppressCellSelection: true};


  constructor() { }

  ngOnInit(): void {
  }

}
