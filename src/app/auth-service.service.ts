import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
 
  //JSON SERVER LOGIN PROBLEM
  login(data):Observable<any>{
  //  console.log('server')
    return this.http.post(`${baseUrl}/login`,data);
  }

  
}
