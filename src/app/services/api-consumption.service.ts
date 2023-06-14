import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiConsumptionService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials: true // ------------ for cookie auth
  };

  constructor(private http: HttpClient) { }

  /**
   * 
   * @typeParam T - Expected object type
   * @param url 
   * @param body 
   * @param options 
   * @returns 
   */
  post<T>(url : string, body : any, options?: {}) : Observable<T>{
    return this.http.post<T>(url, body, (options != null ) ? this.mergeOptions(options) : this.httpOptions );
  }

  /**
   * 
   * @typeParam T Expected object type
   * @param url 
   * @param options 
   * @returns 
   */
  get<T>(url : string, options?: {}) : Observable<T> {
    return this.http.get<T>(url, (options != null ) ? this.mergeOptions(options) : this.httpOptions);
  }

  mergeOptions(options: {}) : {} { // test
    return { ...this.httpOptions, ...options };
  }

}
