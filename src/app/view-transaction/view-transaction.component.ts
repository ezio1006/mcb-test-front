import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Transaction } from '../model/transaction.model';
import { RestService } from '../rest.service';
import { MatSort } from '@angular/material/sort';
import { Currency } from '../model/currency.model';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Transaction[] = [];
  lstCurrency: Currency[];

  displayedColumns: string[] = ['customerName', 'transferAmount', 'idCurrency', 'reference'];

  dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restService: RestService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllCurrency();
    
  }

  getAllCurrency(){
    this.restService.getAllCurrency().subscribe((res) => {
      this.lstCurrency = res;
      this.getExistingTransaction();
    }, error => {
      alert("Error Retrieving All Currency")
    })
  }

  getExistingTransaction() {
    this.restService.getExistingTransaction().subscribe(res => {
      for (let i=0;i<res.length;i++){

        console.log(res[i].idCurrency);
        console.log(this.lstCurrency);
        
        let currency = this.lstCurrency.find(e => {return e.id.toString() == res[i].idCurrency} ).label
        res[i].idCurrency = currency;
      }
      this.dataSource.data = res as Transaction[];

    }, err => {
      alert("Error Fectching Existing Transaction");
    });
  }

}
