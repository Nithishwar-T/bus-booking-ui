import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusService } from '../../services/bus';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-buses',
  imports: [CommonModule, Navbar],
  templateUrl: './buses.html',
  styleUrl: './buses.css'
})
export class Buses implements OnInit {

  buses: any[] = [];

  constructor(
    private busService: BusService
  ) {}

  ngOnInit(): void {

    this.busService
      .getBuses()
      .subscribe((data: any) => {

        this.buses = data.map(
          (bus: any) => ({
            ...bus,

            price:
              Math.floor(
                Math.random() * 1000
              ) + 500
          })
        );

      });

  }

}