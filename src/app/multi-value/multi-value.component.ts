import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BankTransactionComponent } from '../bank-transaction/bank-transaction.component';
import { Transaction } from '../model/transaction.model';
import {MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-multi-value',
  templateUrl: './multi-value.component.html',
  styleUrls: ['./multi-value.component.css']
})
export class MultiValueComponent implements OnInit {
  popup = false
  lstCustomerRef:String;
  lstTransaction:Transaction;
  showTable=false;

  lstToDisplay:String[]=[];
  ELEMENT_DATA: String[] = [];
// 
  // displayedColumns: string[] = ['reference'];

  // dataSource = new MatTableDataSource<String>(this.ELEMENT_DATA);
  constructor(
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.lstToDisplay.push('Cutomer Reference');
  }

  openTransaction(): void {
    console.log('in here');
    const dialogRef = this.dialog.open(BankTransactionComponent, {
      autoFocus: false,
      maxHeight: '80vh'
    })
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null){
          console.log(result);
          this.lstTransaction = result;
          console.log(this.lstTransaction);
          this.showTable=true;
          let ref:string;
          ref = this.lstTransaction.reference;
          console.log('ref' + ref );
          this.lstToDisplay.push(ref);
          console.log(this.lstToDisplay);
        }
      }
    )
  }


}
