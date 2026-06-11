import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:7264/api/User';

  constructor(
    private http: HttpClient
  ) {}

  getUsers() {

    return this.http.get(
      this.apiUrl
    );

  }

}