import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,  RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const body = {

      firstName: this.firstName,

      lastName: this.lastName,

      email: this.email,

      phoneNumber: this.phoneNumber,

      password: this.password

    };

    this.authService
      .register(body)
      .subscribe({

        next: () => {

          alert('Registration Successful');

          this.router.navigate(['/login']);

        },

        error: (err) => {

          console.log(err);

          alert('Registration Failed');

        }

      });

  }

}