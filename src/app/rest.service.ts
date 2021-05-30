import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './Users';
import { baseUrl } from 'src/environments/environment';
import { Currency } from './model/currency.model';
import { Observable } from 'rxjs';
import { Region } from './model/region.model';
import { Transaction } from './model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  // url: string = "http://localhost:3000/Users";

  getUsers(){
    // return this.http.get<Users[]>(this.url);
    return this.http.get<Users[]>(`${baseUrl}/users`);
  }

  getAllCurrency():Observable<Currency[]>{
    return this.http.get<Currency[]>(`${baseUrl}/currency`);
  }

  getAllRegion():Observable<Region[]>{
    return this.http.get<Region[]>(`${baseUrl}/region`);
  }

  addNewTransaction(data):Observable<Transaction[]>{
    return this.http.post<Transaction[]>(`${baseUrl}/transaction`,data);
  }

  getExistingTransaction():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${baseUrl}/transaction`);
  }
}
