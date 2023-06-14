import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

export const roleGuard = function(allowedRoles: string[]) : CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const userService = inject(UserService);
    let canActivateRoute : boolean = userService.userHasRole(allowedRoles);
    if(!canActivateRoute)
      router.navigate(['']);
    return canActivateRoute;
  }
};
