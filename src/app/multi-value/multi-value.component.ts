import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transaction } from '../model/transaction.model';
import { MatListModule } from '@angular/material/list'
import { BankTransactionPopupComponent } from '../bank-transaction-popup/bank-transaction-popup.component';

@Component({
  selector: 'app-multi-value',
  templateUrl: './multi-value.component.html',
  styleUrls: ['./multi-value.component.css']
})
export class MultiValueComponent implements OnInit {
  popup = false
  lstCustomerRef: String;
  lstTransaction: Transaction;
  showTable = false;

  lstToDisplay: String[] = [];
  lstToDisplayStatic: String[]=[];
  ELEMENT_DATA: String[] = [];

  constructor(
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.lstToDisplayStatic.push('Cutomer Reference');
  }

  openTransaction(): void {
    console.log('in here');
    const dialogRef = this.dialog.open(BankTransactionPopupComponent, {
      autoFocus: false,
      maxHeight: '80vh'
    })
    dialogRef.afterClosed().subscribe(
      result => {
        if (result != null) {
          console.log(result);
          this.lstTransaction = result;
          console.log(this.lstTransaction);
          this.showTable = true;
          let ref: string;
          ref = this.lstTransaction.reference;
          console.log('ref' + ref);
          this.lstToDisplay.push(ref);
          console.log(this.lstToDisplay);
        }
      }
    )
  }

  reset():void{
    this.lstToDisplay = [];
  }

  deleteFromList(lstdelete: string): void {
    const index = this.lstToDisplay.indexOf(lstdelete, 0);
    if (index > -1) {
      this.lstToDisplay.splice(index, 1);
    }
    console.log(this.lstToDisplay);
  }

}
