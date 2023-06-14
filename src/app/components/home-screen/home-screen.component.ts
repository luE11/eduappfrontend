import { Component } from '@angular/core';
import { JwtToken } from 'src/app/interfaces/jwtToken';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {

  constructor(private authService: AuthService) {}


  /** Refresh Jwt by using refresh_token cookie */
  refreshToken(){ //TODO: Delete this method
    this.authService.refreshToken()
      .subscribe({
        next: function (data : JwtToken ) {
          localStorage.setItem('access_token', data.jwttoken);
          localStorage.setItem('token_expiration_date', JSON.stringify(data.tokenExpirationDate));
        },
        error: function (err) {
          console.log(err);
          // router.navigate(['login']) add feedback message? session expired?
        }
      });
  }
}
