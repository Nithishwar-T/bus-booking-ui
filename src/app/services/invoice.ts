import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl =
    'https://localhost:7264/api/Invoice';

  constructor(
    private http: HttpClient
  ) {}

  getInvoice(
    bookingId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/${bookingId}`
    );

  }

}