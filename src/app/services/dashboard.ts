import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = 'https://localhost:7264/api/Dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getDashboard() {

    return this.http.get(this.apiUrl);

  }
}