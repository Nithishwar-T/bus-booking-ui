import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl = 'https://localhost:7264/api/Booking';

  constructor(private http: HttpClient) {}

  createBooking(data:any) {

    return this.http.post(
      this.apiUrl,
      data
    );

  }

  getBookings() {

    return this.http.get(
      this.apiUrl
    );

  }

  deleteBooking(id:number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
  cancelBooking(id:number){

  return this.http.put(
    `${this.apiUrl}/Cancel/${id}`,
    {}
  );

}

getInvoice(
  bookingId:number
){
  return this.http.get(
    `https://localhost:7264/api/Invoice/${bookingId}`
  );
}

getBookedSeats(busId:number){

  return this.http.get(
    `${this.apiUrl}/bus/${busId}`
  );

}
}