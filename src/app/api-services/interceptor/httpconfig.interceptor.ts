import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../auth-service/auth-service.service';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const userToken = (this.authService.token) ? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU4NDUxNDE0MSwiZXhwIjoxNTg0NTE3NzQxLCJuYmYiOjE1ODQ1MTQxNDEsImp0aSI6InQwWURXRGFSZGFSdW43RE8iLCJzdWIiOjQsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.W79DrGZm0ChuOYP8DqHW7iU7a22IvIGw00fbc71EKn812" : null;
    const userToken = (this.authService.token) ? this.authService.token.access_token : null;
    if (userToken) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + userToken) });
    }
    if (request.headers.has(InterceptorSkipHeader)) {
      request = request.clone({ headers: request.headers.delete(InterceptorSkipHeader) });
    } else {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    // console.log('check->>>>', request);
    return next.handle(request).pipe(
      catchError((err, caught) => {
        if (err.status === 400) {
          this.authService.logout();
          this.router.navigate(['login']);
          // this.router.navigate(['/login'], {
          //   // queryParams: { redirectUrl: this.router.routerState.snapshot.url }
          // });
        }

        return new Observable<HttpEvent<any>>();
      })
    );
  }
}

