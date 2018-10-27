import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CheckAvailabilityService {

  constructor(private http: HttpClient) { }

  checkBalance(accid: string, balance: string) {
    const url = 'http://localhost:8100/checkavailable';
    const obj = {
      accid: accid,
      balance: balance
    };
    return this.http.post(url, obj);
  }

}
