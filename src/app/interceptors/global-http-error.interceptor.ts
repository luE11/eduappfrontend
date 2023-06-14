import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status == 401 && error.error) {
          let message = (error.error.detail!=null) ? error.error.detail : error.error.message
          if(message.indexOf("Refresh token was expired") != -1){
            localStorage.clear();
            this.router.navigate(['login']); // refresh token cookie is expired... Redirect to login
          }
        }
        return throwError(() => error.message);
      })
    )
  }
}
