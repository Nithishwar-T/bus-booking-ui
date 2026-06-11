import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../../components/footer/footer';

import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    RouterModule,
    FormsModule,
    Footer
  ],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {

  bookings: any[] = [];

  filteredBookings: any[] = [];

  searchText = '';

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.loadBookings();

  }

  loadBookings() {

    this.bookingService
      .getBookings()
      .subscribe({

        next: (data: any) => {

          this.bookings = data;

          this.filteredBookings = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  searchBookings() {

    const search =
      this.searchText
        .toLowerCase();

    this.filteredBookings =
      this.bookings.filter(
        (booking: any) =>

          booking.passengerName
            ?.toLowerCase()
            .includes(search)

          ||

          booking.email
            ?.toLowerCase()
            .includes(search)

          ||

          booking.bookingReference
            ?.toLowerCase()
            .includes(search)

      );

  }

  cancelBooking(id: number) {

    Swal.fire({

      title: 'Are you sure?',

      text: 'You want to cancel this booking',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#d84e55',

      cancelButtonColor: '#6c757d',

      confirmButtonText: 'Yes, Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        this.bookingService
          .deleteBooking(id)
          .subscribe({

            next: () => {

              Swal.fire({

                icon: 'success',

                title: 'Cancelled',

                text: 'Booking cancelled successfully'

              });

              this.loadBookings();

            },

            error: (err) => {

              console.log(err);

            }

          });

      }

    });

  }

  openInvoice(id: number) {

    window.open(
      `/invoice/${id}`,
      '_blank'
    );

  }

}