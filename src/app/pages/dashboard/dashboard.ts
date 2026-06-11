import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

import { BusService } from '../../services/bus';
import { BookingService } from '../../services/booking';
import { UserService } from '../../services/user';
import { DashboardService }
from '../../services/dashboard';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    Footer
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalUsers = 0;

  totalBuses = 0;

  totalBookings = 0;

  totalRevenue = 0;

totalTravels = 0;

totalCancelledBookings = 0;

  constructor(
  private dashboardService: DashboardService
)
{}

  ngOnInit(): void {

  this.loadDashboard();

}

loadDashboard() {

  this.dashboardService
    .getDashboard()
    .subscribe({

      next: (data: any) => {

        this.totalUsers =
          data.totalUsers;

        this.totalBuses =
          data.totalBuses;

        this.totalBookings =
          data.totalBookings;

        this.totalTravels =
          data.totalTravels;

        this.totalRevenue =
          data.totalRevenue;

        this.totalCancelledBookings =
          data.totalCancelledBookings;

      },

      error: (err) => {

        console.log(err);

      }

    });

}

}