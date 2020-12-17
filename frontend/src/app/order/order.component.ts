import {Component, OnInit} from "@angular/core";
import "ag-grid-enterprise";
import {HttpClient} from "@angular/common/http";
import {PreviewButtonComponent} from "../preview-button/preview-button.component";
import {ComplaintButtonComponent} from "../complaint-button/complaint-button.component";
import {GridOptions} from "ag-grid-community";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public detailCellRendererParams;
  public rowData;
  public orderOptions: GridOptions;

  constructor(private http: HttpClient) {
    this.rowData = [
      {
        "id": "12345",
        "totalPrice": 177003,
        "amountProducts": 3,
        "products": [
            {id: 1, shortDescription: "Monitor Samsung Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
            {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
            {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"}
        ]
      },
      {
        "id": "757",
        "totalPrice": 177003.0,
        "amountProducts": 3,
        "products": [
          {id: 1, shortDescription: "Monitor Samsung 21'", price: 500, quantity: 20, description: "TODO"},
          {id: 2, shortDescription: "Monitor Samsung 23'", price: 700, quantity: 40, description: "TODO"},
          {id: 3, shortDescription: "Monitor Samsung 26'", price: 900, quantity: 70, description: "TODO"}
        ]
      }];


    this.columnDefs = [
      {
        field: 'id',
        headerName: 'ID Zamowienia',
        cellRenderer: 'agGroupCellRenderer',
      },
      { field: 'totalPrice',
        headerName: 'Sumaryczna cena'
      },
      { field: 'amountProducts',
        headerName: 'Ilosc Produktow',
      },
    ];
    this.defaultColDef = { flex: 1 };
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: 'id',
            headerName: 'ID',
            maxWidth: 100
          },
          {
            field: 'shortDescription',
            headerName: 'Opis',
            maxWidth: 350
          },
          {
            field: 'price',
            headerName: 'Cena',
            maxWidth: 100
          },
          {
            field: 'quantity',
            headerName: 'Ilosc',
            maxWidth: 150
          },
          {headerName: 'Reklamacja', maxWidth: 200,  cellRendererFramework: ComplaintButtonComponent},
          {headerName: 'Przegladaj', maxWidth: 200,  cellRendererFramework: PreviewButtonComponent}

        ],
        defaultColDef: { flex: 1 },
        suppressCellSelection: true
      },
      getDetailRowData: function (params) {
          params.successCallback(params.data.products);
      },
    };
    this.orderOptions = {suppressCellSelection: true};
  }


  ngOnInit(): void {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }

}
