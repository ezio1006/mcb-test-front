import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MultiValueComponent } from './multi-value/multi-value.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "newtransaction", component: BankTransactionComponent },
  { path: "viewtransaction", component: ViewTransactionComponent },
  { path: "multiform", component: MultiValueComponent },
  { path: "**", component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
