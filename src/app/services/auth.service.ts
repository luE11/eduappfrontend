import { Injectable } from '@angular/core';
import { ApiConsumptionService } from './api-consumption.service';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/credentials';
import { JwtToken } from '../interfaces/jwtToken';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl : string = environment.api_endpoint+"/auth/";
  private readonly refreshTokenUrl : string = environment.api_endpoint+"/auth/refreshtoken";

  constructor(private apiConsumption: ApiConsumptionService) { }

  login(credentials: Credentials) {
    return this.apiConsumption.post<JwtToken>(this.loginUrl, credentials);
  }

  refreshToken() {
    return this.apiConsumption.get<JwtToken>(this.refreshTokenUrl);
  }

  isTokenExpired() : boolean {
    let tokenExpirationDate = localStorage.getItem('token_expiration_date');
    if(tokenExpirationDate==null)
      return true;
    let expirationDate = JSON.parse(tokenExpirationDate);
    return ((new Date()).getTime()-(new Date(expirationDate)).getTime() >= 0);
  }

  logout(){
    localStorage.clear()
  }

  isLoggedIn(){
    return localStorage.getItem('access_token')!=null
  }

}
