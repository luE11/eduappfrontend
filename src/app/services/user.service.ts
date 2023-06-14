import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiConsumptionService } from './api-consumption.service';
import { Person } from '../interfaces/person';
import { Observable } from 'rxjs';
import { UserSpec } from '../interfaces/user-spec';
import { Pageable } from '../interfaces/pageable';
import { HttpParams } from '@angular/common/http';
import { UserArray } from '../interfaces/users/userArray';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly personUrl : string = environment.api_endpoint+"/user";

  constructor(private apiConsumptionService: ApiConsumptionService) { }

  public getPersonDetails() : Observable<Person> {
    let user_id = localStorage.getItem('user_id');
    return this.apiConsumptionService.get<Person>(`${this.personUrl}/${user_id}`);
  }

  public getUsers(spec: UserSpec | null, pageable: Pageable | null) : Observable<UserArray> {
    return this.apiConsumptionService.get<UserArray>(this.personUrl, {
      params: { ...spec, ...pageable }
    });
  }

  public getSelfRoles(): string[] | null{
    let userRoles = localStorage.getItem('roles');
    if(userRoles==null)
      return null;
    return userRoles.split(',');
  }

  public userHasRole(allowedRoles: String[]) : boolean {
    let roleArray = this.getSelfRoles()
    if(roleArray==null)
      return false
    let canActivateRoute : boolean = false;
    for (let i = 0; i < roleArray.length && !canActivateRoute; i++)
      for (let j = 0; j < allowedRoles.length && !canActivateRoute; j++)
        if(roleArray[i] === allowedRoles[j])
          canActivateRoute = true;
    return canActivateRoute;
  }
}
