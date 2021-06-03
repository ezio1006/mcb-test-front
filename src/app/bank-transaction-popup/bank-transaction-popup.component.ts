import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Currency } from '../model/currency.model';
import { Region } from '../model/region.model';
import { Transaction } from '../model/transaction.model';
import { MultiValueComponent } from '../multi-value/multi-value.component';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-bank-transaction-popup',
  templateUrl: './bank-transaction-popup.component.html',
  styleUrls: ['./bank-transaction-popup.component.css']
})
export class BankTransactionPopupComponent implements OnInit {

  transactionForm: FormGroup;

  lstCurrency: Currency[];
  lstRegion: Region[];
  lstAllTransaction: Transaction[];
  objTransaction: Transaction;

  emptyTransaction: Transaction = {
    type: null,
    reference: null,
    idCurrency: null,
    customerNumber: null,
    customerName: null,
    customerAddress: null,
    customerPhoneNumber: null,
    transferAmount: null,
    beneficiaryBank: null,
    beneficiaryAccountNumber: null,
    paymentDetails: null,
    cardDetails: null,
    idRegion: null,
  }

  constructor(private restService: RestService,
    public dialogRef: MatDialogRef<MultiValueComponent>
    ) { }

  ngOnInit(): void {
    this.getAllCurrency();
    this.getAllRegion();
    this.initForm(this.emptyTransaction);
  }



  initForm(transaction: Transaction) {
    this.objTransaction = transaction;
    console.log(transaction.type);
    this.transactionForm = new FormGroup({
      type: new FormControl(transaction && transaction.type ? transaction.type : null, [Validators.required]),
      reference: new FormControl(transaction && transaction.reference ? transaction.reference : null, [Validators.required, Validators.pattern('^CUS((19|2[0-9])[0-9]{2})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])([0-9]{4})$')]),
      idCurrency: new FormControl(transaction && transaction.idCurrency ? transaction.idCurrency : null, [Validators.required]),
      customerNumber: new FormControl(transaction && transaction.customerNumber ? transaction.customerNumber : null, [Validators.required]),
      customerName: new FormControl(transaction && transaction.customerName ? transaction.customerName : null, [Validators.required]),
      customerAddress: new FormControl(transaction && transaction.customerAddress ? transaction.customerAddress : null, [Validators.required]),
      customerPhoneNumber: new FormControl(transaction && transaction.customerPhoneNumber ? transaction.customerPhoneNumber : null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      transferAmount: new FormControl(transaction && transaction.transferAmount ? transaction.transferAmount : null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      beneficiaryBank: new FormControl(transaction && transaction.beneficiaryBank ? transaction.beneficiaryBank : null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      beneficiaryAccountNumber: new FormControl(transaction && transaction.beneficiaryAccountNumber ? transaction.beneficiaryAccountNumber : null, [Validators.required]),
      paymentDetails: new FormControl(transaction && transaction.paymentDetails ? transaction.paymentDetails : null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      cardDetails: new FormControl(transaction && transaction.cardDetails ? transaction.cardDetails : null, [Validators.required]),
      idRegion: new FormControl(transaction && transaction.idRegion ? transaction.idRegion : null, [Validators.required]),
    })
    if (this.objTransaction.type === "new") {
      this.transactionForm.controls.type.setValue("existing");
    }

    if(this.transactionForm.value.idRegion == 4 ){
      this.transactionForm.controls.customerAddress.disable();
      this.transactionForm.controls['customerAddress'].setValidators([Validators.nullValidator]);
      this.transactionForm.controls['customerAddress'].updateValueAndValidity({onlySelf:true});
      this.transactionForm.controls['customerAddress'].setValue(null);
      
    }
  }

  getAllCurrency(): void {
    this.restService.getAllCurrency().subscribe((res) => {
      this.lstCurrency = res;
    }, error => {
      alert("Error Retrieving All Currency")
    })
  }

  getAllRegion(): void {
    this.restService.getAllRegion().subscribe((res) => {
      this.lstRegion = res;
    }, error => {
      alert("Error Retrieving All Currency")
    })
  }

  getCustomerDetails(e): void {
    if (this.transactionForm.value.type === "existing") {

      if (this.lstAllTransaction.find(e => e.customerNumber === this.transactionForm.value.customerNumber)) {
        for (let i = 0; i < this.lstAllTransaction.length; i++) {
          if (this.lstAllTransaction[i].customerNumber == this.transactionForm.value.customerNumber) {
            this.objTransaction = this.lstAllTransaction[i];
            this.objTransaction.reference = null;
            this.objTransaction.idCurrency = null;
            this.objTransaction.transferAmount = null;
            this.objTransaction.beneficiaryBank = null;
            this.objTransaction.beneficiaryAccountNumber = null;
            this.objTransaction.paymentDetails = null;
            this.objTransaction.cardDetails = null;
            this.objTransaction.idRegion = null;
            this.initForm(this.objTransaction);
          }
        }
      } else {
        alert("Customer Does Not Exist");
        this.transactionForm.controls.type.setValue("new");
      }

    }
  }

  changeType(e): void {
    console.log(e.value);
    if (e.value === "existing") {
      this.restService.getExistingTransaction().subscribe(res => {
        this.lstAllTransaction = res;

      }, err => {
        alert("Error Fectching Existing Transaction");
      });
    } else {
      this.initForm(this.emptyTransaction);
      this.transactionForm.controls.type.setValue("new");
    }
  }


  addNewTransaction() {
    console.log(this.transactionForm.value);
    this.restService.addNewTransaction(this.transactionForm.value).subscribe(res => {
      alert("New Transaction added successfully");
      this.dialogRef.close(this.transactionForm.value);
    }, err => {
      alert("Error Adding New Transaction");
    });

  }

  
  checkRegion(e):void{
    if(e.value == 4 ){
      this.transactionForm.controls.customerAddress.disable();
      this.transactionForm.controls['customerAddress'].setValidators([Validators.nullValidator]);
      this.transactionForm.controls['customerAddress'].updateValueAndValidity({onlySelf:true});
      this.transactionForm.controls['customerAddress'].setValue(null);
      
    }
  
    if(e.value != 4  && this.transactionForm.controls.customerAddress.disabled ){
      this.transactionForm.controls.customerAddress.enable();
      this.transactionForm.controls['customerAddress'].setValidators([Validators.required]);
      this.transactionForm.controls['customerAddress'].updateValueAndValidity({onlySelf:true});
      this.transactionForm.controls['customerAddress'].setValue(null);
      
    }
  }


}
