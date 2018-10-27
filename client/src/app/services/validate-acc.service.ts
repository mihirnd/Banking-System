import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ValidateAccService {

  constructor(private http: HttpClient) { }

  validate(accid: string) {
    const url = 'http://localhost:8100/accvalid';
    const obj = {
      accid: accid
    };
    return this.http.post(url, obj);
  }
}
