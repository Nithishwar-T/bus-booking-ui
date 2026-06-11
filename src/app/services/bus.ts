import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  apiUrl = 'https://localhost:7264/api/Bus';

  constructor(private http: HttpClient) {}

  getBuses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBusById(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

 addBus(bus:any){
  return this.http.post(
    this.apiUrl,
    bus,
    { responseType: 'text' }
  );
}
  deleteBus(id:number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

}