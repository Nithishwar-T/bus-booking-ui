import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  roleId = '';

email = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(){

  this.roleId =
    localStorage.getItem(
      'roleId'
    ) || '';

  this.email =
    localStorage.getItem(
      'email'
    ) || '';

}

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

}