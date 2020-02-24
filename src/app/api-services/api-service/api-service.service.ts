import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { InterceptorSkipHeader } from '../interceptor/httpconfig.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // baseUrl: string = 'https://6a4db3b3.ngrok.io/';
  baseUrl: string = 'http://438d2d6f.ngrok.io/';


  constructor(private http: HttpClient) { }
  /*    user'a apis        */
  login(user: string, pwd: string): Observable<any> {
    let data = { email: user, password: pwd };
    return this.http.post(`${this.baseUrl}api/auth/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/logout`, {});
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-user?id=${id}`);
  }

  getUnAssiendAccounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-unassingned-accounts`);
  }

  updateComment(id, comments): Observable<any> {
    const data = { 'id': id, 'comments': comments }
    return this.http.post(this.baseUrl + 'api/auth/update-alert', data)
  }
  updateUserProfile(data: any): Observable<any> {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http.post(`${this.baseUrl}api/auth/update-user`, data, { headers: headers });
  }

  registerUser(data: any): Observable<any> {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http.post(`${this.baseUrl}api/auth/register`, data, { headers: headers });
  }

  getUsersTeam(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-user-team?id=${userId}`);
  }

  getUsersTeamByRoles(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-team?id=${userId}`);
  }

  /* databases adwords'a apis   */

  getAccounts(id?: number): Observable<any> {
    const param = id ? `?id=${id}` : '';
    return this.http.get(`${this.baseUrl}api/auth/get-accounts${param}`);
  }

  addAccounts(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/add-account`, data);
  }

  updateAccounts(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/update-account`, data);
  }

  getAccountInfo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-account-info?id=${id}`);
  }
  updateUnassigned(unSyncAcc): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/update-unassingned-accounts`, unSyncAcc);
  }


  getALlAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-dashboard-alerts`)
  }

}
