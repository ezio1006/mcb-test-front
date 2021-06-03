import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransactionPopupComponent } from './bank-transaction-popup.component';

describe('BankTransactionPopupComponent', () => {
  let component: BankTransactionPopupComponent;
  let fixture: ComponentFixture<BankTransactionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTransactionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTransactionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
