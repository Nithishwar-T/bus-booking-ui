import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { BusService } from '../../services/bus';
import Swal from 'sweetalert2';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  busName = '';
  busNumber = '';
  travelId = 1;

busType = '';

totalSeats = 40;

  buses:any[] = [];

  constructor(
    private busService: BusService
  ){}

  ngOnInit(): void {

    this.loadBuses();

  }

  loadBuses() {

    this.busService.getBuses()
      .subscribe({

        next: (data:any) => {

          this.buses = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  addBus() {

    const bus = {

  travelId: this.travelId,

  busName: this.busName,

  busNumber: this.busNumber,

  busType: this.busType,

  totalSeats: this.totalSeats,

  isActive: true

};

    this.busService
      .addBus(bus)
      .subscribe({

        next: () => {

          Swal.fire({
  icon: 'success',
  title: 'Bus Added',
  text: 'New bus has been added successfully',
  confirmButtonColor: '#d84e55'
});

          this.busName = '';

          this.busNumber = '';

          this.loadBuses();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

deleteBus(id:number) {

  this.busService
      .deleteBus(id)
      .subscribe({

        next:()=>{

          Swal.fire({
  icon: 'success',
  title: 'Bus Deleted',
  text: 'Bus removed successfully',
  confirmButtonColor: '#d84e55'
});

          this.loadBuses();

        },

        error:(err)=>{

          console.log(err);

        }

      });

}

}