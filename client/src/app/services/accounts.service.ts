import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../user-details';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) { }
  getAccounts(uid: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        uid: String(uid)
      })
    };
    const url = 'http://localhost:8100/accounts';
    return this.http.get(url, httpOptions);
  }
}
