import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtToken } from 'src/app/interfaces/jwtToken';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
    private titleService: Title,
    private router: Router) {
    }

  ngOnInit(): void {
    if(localStorage.getItem('access_token')!=null)
      this.redirectToHome();

    this.titleService.setTitle('eduapp | login');
    this.loginForm = new FormGroup({
      username: new FormControl('luis.martinez', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+\\.[a-zA-Z]+[0-9]*$')
      ]),
      password: new FormControl(']1sO-$N/*#', [
        Validators.required
      ])
    });
  }

  /** For html form access  */
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  //

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm.status==="VALID") {
      this.login();
    }
  }

  isFieldInvalid(field: string){
    return this.loginForm.get(field)?.invalid 
      && (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched);
  }

  login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: function (data : JwtToken ) {
          localStorage.setItem('access_token', data.jwttoken);
          localStorage.setItem('token_expiration_date', JSON.stringify(data.tokenExpirationDate));
          localStorage.setItem('user_id', data.id!.toString());
          localStorage.setItem('username', data.username!);
          localStorage.setItem('roles', data.roles!.toString());
        },
        error: function (err) {
          console.log(err);
        },
        complete: () => {
          if(localStorage.getItem('access_token')!=null)
            this.redirectToHome();
        }
      });
  }

  redirectToHome(){
    this.router.navigate(['']);
  }

}
