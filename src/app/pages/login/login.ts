import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';

  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const body = {

      email: this.email,

      password: this.password

    };

    this.authService
      .login(body)
      .subscribe((res:any)=>{

        localStorage.setItem(
  'token',
  res.token
);

localStorage.setItem(
  'roleId',
  res.roleId
);

localStorage.setItem(
  'email',
  res.email
);

localStorage.setItem(
  'token',
  res.token
);

        this.router.navigate(['/dashboard']);

      });

  }

}