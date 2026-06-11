import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../navbar/navbar';

import { BusService } from '../../services/bus';
import { BookingService } from '../../services/booking';
import Swal from 'sweetalert2';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking implements OnInit {

  buses: any[] = [];

  filteredBuses: any[] = [];

searchText = '';

  selectedBus: any = null;

  selectedSeat = '';

  passengerName = '';

  age = 0;

  gender = '';

  mobile = '';

  email = '';

  upperSeats = [
  'U1','U2','U3','U4',
  'U5','U6','U7','U8'
];

lowerSeats = [
  'L1','L2','L3','L4',
  'L5','L6','L7','L8'
];

pushBackSeats = [
  'A1','A2','A3','A4',
  'B1','B2','B3','B4',
  'C1','C2','C3','C4'
];

bookedSeats:string[]=[];

  constructor(
    private busService: BusService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    this.busService
      .getBuses()
      .subscribe({

        next: (data: any) => {

         this.buses = data.map(
  (bus:any)=>({

    ...bus,

    price:
      Math.floor(
        Math.random()*1000
      ) + 500,

    rating:
      (
        4 + Math.random()
      ).toFixed(1),

    departure:
      '10:00 PM',

    arrival:
      '06:30 AM',

    duration:
      '8h 30m',

    availableSeats:
      Math.floor(
        Math.random()*20
      ) + 20

  })
);

this.filteredBuses =
  this.buses;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  selectBus(bus:any){

  this.selectedBus = bus;

  this.bookingService
    .getBookedSeats(bus.busId)
    .subscribe({

      next:(data:any)=>{

        this.bookedSeats =
          data.map(
            (x:any)=>x.seatNumber
          );

      }

    });

}

  selectSeat(seat: string) {

  this.selectedSeat = seat;

}

searchBus(){

  const search =
    this.searchText
      .toLowerCase();

  this.filteredBuses =
    this.buses.filter(
      (bus:any)=>

      bus.busName
        .toLowerCase()
        .includes(search)

      ||

      bus.busType
        .toLowerCase()
        .includes(search)

      ||

      bus.busNumber
        .toLowerCase()
        .includes(search)

    );

}


  createBooking() {

    if (!this.selectedBus) {

      alert('Please select a bus');

      return;

    }

    if (!this.selectedSeat) {

      alert('Please select a seat');

      return;

    }

    const booking = {

      busId: this.selectedBus.busId,

      passengerName: this.passengerName,

      age: this.age,

      gender: this.gender,

      mobile: this.mobile,

      email: this.email,

      seatNumber: this.selectedSeat

    };

    this.bookingService
      .createBooking(booking)
      .subscribe({

        next: () => {

          Swal.fire({
  icon: 'success',
  title: 'Booking Confirmed',
  text: 'Your ticket has been booked successfully',
  confirmButtonColor: '#d84e55'
});

          this.selectedSeat = '';

          this.passengerName = '';

          this.age = 0;

          this.gender = '';

          this.mobile = '';

          this.email = '';

        },

        error: (err) => {

          console.log(err);

          alert(
            err?.error?.message ||
            'Booking Failed'
          );

        }

      });

  }
  

}