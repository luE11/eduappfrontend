import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtToken } from '../interfaces/jwtToken';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router) {}

  private readonly excluded_routes : string[] = [
    '/api/auth/refreshtoken',

  ];
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let copyRequest = request;
    if(!this.mustExclude(request.url)){
      let token = localStorage.getItem('access_token');
      if(token){
        if(this.authService.isTokenExpired()){
          this.refreshToken()
          token = localStorage.getItem('access_token');
        }
        copyRequest = request.clone( {
          headers: request.headers.append('Authorization', `Bearer ${token}`),
        })
      }
    }
    return next.handle(copyRequest);
  }

  private mustExclude(requestRoute : string) : boolean {
    for (let i=0; i < this.excluded_routes.length; i++) {
      if(requestRoute.indexOf(this.excluded_routes[i])!=-1)
        return true
    }
    return false;
  }

  private refreshToken(){
    this.authService.refreshToken()
      .subscribe({
        next: function (data : JwtToken ) {
          localStorage.setItem('access_token', data.jwttoken);
          localStorage.setItem('token_expiration_date', JSON.stringify(data.tokenExpirationDate));
        },
        error: this.handleRefreshTokenExpired
      });
  }

  handleRefreshTokenExpired(err: Error){
    if(this.router!=undefined)
      this.router.navigate(['login']);// add feedback message? session expired?
  }
}
