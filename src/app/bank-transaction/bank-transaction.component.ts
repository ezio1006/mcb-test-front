import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.css']
})
export class BankTransactionComponent implements OnInit {
  
  newTransactionForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.newTransactionForm = new FormGroup({
      type: new FormControl(['', Validators.required]),
      reference: new FormControl('',[Validators.required]),
    })
  }

  addNewTransaction(){}

}
