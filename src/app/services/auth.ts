import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl='https://localhost:7264/api/User';

  constructor(private http:HttpClient) {}

  login(data:any) {

    return this.http.post(
      `${this.apiUrl}/Login`,
      data
    );

  }

  register(data:any) {

    return this.http.post(
      `${this.apiUrl}/Register`,
      data
    );

  }

}