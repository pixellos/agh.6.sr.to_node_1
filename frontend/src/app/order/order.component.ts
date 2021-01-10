import {Component, OnInit} from "@angular/core";
import "ag-grid-enterprise";
import {PreviewButtonComponent} from "../preview-button/preview-button.component";
import {ComplaintButtonComponent} from "../complaint-button/complaint-button.component";
import {GridOptions} from "ag-grid-community";
import {DefaultService as OrderHttpClient} from "../../client-order";

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
  public orderData;
  public orderOptions: GridOptions;

  constructor(private httpClient: OrderHttpClient) {
    this.orderData = [];

    this.columnDefs = [
      {
        field: 'id',
        headerName: 'ID Zamowienia',
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        field: 'totalPrice',
        headerName: 'Sumaryczna cena'
      },
      {
        field: 'amountOfProducts',
        headerName: 'Ilosc Produktow',
      },
      {
        headerName: 'Reklamacja',
        maxWidth: 200,
        cellRendererFramework: ComplaintButtonComponent
      }
    ];
    this.defaultColDef = { flex: 1 };
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
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
          {
            field: 'totalPrice',
            headerName: 'Suma',
          },
          {
            headerName: 'Przegladaj',
            maxWidth: 200,
            cellRendererFramework: PreviewButtonComponent}
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
    this.httpClient.all().subscribe(response => {
      this.orderData = response.data
    })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
