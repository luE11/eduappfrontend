import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logged-in-layout',
  templateUrl: './logged-in-layout.component.html',
  styleUrls: ['./logged-in-layout.component.scss']
})
export class LoggedInLayoutComponent {

  readonly userListRoute = "/user/list";

  username: string | null;

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) {
      this.username = localStorage.getItem('username');
    }

  userHasRoles(allowedRoles: string[]){
    return this.userService.userHasRole(allowedRoles);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
