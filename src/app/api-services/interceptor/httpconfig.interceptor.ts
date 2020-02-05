import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../auth-service/auth-service.service';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService,) {
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = (this.authService.token) ? this.authService.token.access_token : null;
    if (userToken) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + userToken) });
    }
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request);
  }
}