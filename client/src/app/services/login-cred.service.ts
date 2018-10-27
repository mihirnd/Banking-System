import { Injectable } from '@angular/core';
import { IUser } from '../user-details';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginCredService {
  static account_no: string;
  static user: IUser;
  constructor(private http: HttpClient) { }
  setUser(user: IUser) {
    console.log(user);
    LoginCredService.user = user;
  }

  login(obj: any) {
    const url = 'http://localhost:8100/login';
    return this.http.post(url, obj);
  }

  getUser() {
    return LoginCredService.user;
  }
}
