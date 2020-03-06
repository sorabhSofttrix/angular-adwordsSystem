import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable, BehaviorSubject } from 'rxjs';
import { InterceptorSkipHeader } from '../interceptor/httpconfig.interceptor';
import { environment } from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl: string = environment.url;

  skipHeaders = new HttpHeaders().set(InterceptorSkipHeader, '');
  // baseUrl: string = 'http://eb3dc973.ngrok.io/';

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
    return this.http.post(`${this.baseUrl}api/auth/update-user`, data, { headers: this.skipHeaders });
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/register`, data, { headers: this.skipHeaders });
  }

  getUsersTeam(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-user-team?id=${userId}`);
  }

  getUsersTeamByRoles(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-team?id=${userId}`);
  }

  /* databases adwords'a apis   */

  //Start Accounts API call********

  getAccounts(id?: number, userid?: number): Observable<any> {
    const param = id ? `?id=${id}` : userid ? `?userid=${userid}` : '';
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


  //Start Accounts API call********


  //Start Alert API call********

  getALlAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/auth/get-dashboard-alerts`)
  }
  getAllAlertCount(): Observable<any> {

    return this.http.get(this.baseUrl + 'api/auth/get-alerts-count')
  }

  getAccountSummary(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/account-status-summary')
  }


  getDteWiseData(reqBody): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/account-dated-status', reqBody)
  }
  //End Alert API call********


  //Start Reason API call********


  createReason(reasonBody): Observable<any> {
    return this.http.post(this.baseUrl + '/api/auth/add-reason', reasonBody)
  }

  getAllReasons(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/auth/get-reasons')
  }

  getReasonById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/get-reasons?id=' + id)
  }

  updateReason(data): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/add-reason', data)
  }


  deleteReason(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/delete-reason?id=' + id)
  }
  //End Reason API call********

  // checkData() {
  //   return timer(0, 10000)
  //     .pipe(
  //       switchMap(_ => this.http.get(this.baseUrl + '/api/auth/get-alerts-count')),
  //       // catchError(error => of(`Bad request: ${error.error}`))
  //     );
  // }


  //Start Profile API call********
  createProfile(profileData): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/add-profile', profileData)
  }


  getAllProfiles(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/get-profiles')
  }

  getProfileById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/auth/get-profiles?id=' + id)
  }

  updateProfile(id, upDateData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/auth/update-profile?id=' + id, upDateData)
  }

  deleteProfile(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/delete-profile?id=' + id)
  }

  // End Profile API call********



  //Start Client API call********
  createClient(clientData): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/add-client', clientData)
  }


  getAllClient(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/get-clients')
  }

  getClientById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/auth/get-clients?id=' + id)
  }

  updateClient(id, upDateData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/auth/update-client?id=' + id, upDateData)
  }

  deleteClient(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/delete-client?id=' + id)
  }

  // End client API call********


  //Start Project API call********
  createProject(projectData): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/add-project', projectData, { headers: this.skipHeaders })
  }


  getAllProject(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/get-projects')
  }

  getProjectById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/auth/get-projects?id=' + id)
  }

  updateProject(updateData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/auth/update-project', updateData, { headers: this.skipHeaders })
  }

  deleteProject(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/delete-project?id=' + id)
  }

  deleteProjectImg(id, projectId): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/delete-additional-file?id=' + id + '&project_id=' + projectId)
  }
  // End Project API call********


  //check google id exits

  checkGoogleId(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/auth/check-adwords-account?g_acc_id=' + id)
  }


}
