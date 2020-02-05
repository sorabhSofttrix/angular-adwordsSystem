import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  login(user: string, pwd: string): Observable <any> {
    let data = { email: user, password: pwd };
    return this.http.post(`${this.baseUrl}api/auth/login`, data);
  }

  logout(): Observable <any> {
    return this.http.post(`${this.baseUrl}api/auth/logout`,{});
  }

}
