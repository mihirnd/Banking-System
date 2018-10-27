import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginCredService } from '../services/login-cred.service';
import { isObject } from 'util';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [LoginCredService]
})

export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginCredService: LoginCredService
  ) {
    this.newUserForm = fb.group({
      name: [''],
      pwd: [''],
      email: ['']
    });
  }

  ngOnInit() {
  }

  register() {
    const obj = {
      name: this.newUserForm.value.name,
      email: this.newUserForm.value.email,
      pwd: this.newUserForm.value.email
    };
    const url = 'http://localhost:8100/register';
    this.http.post(url, obj).subscribe(
      res => {
        console.log(res);
        const user = {
          uid: Number(res),
          name: obj.name,
          email: obj.email,
          pwd: ''
        };
        this.loginCredService.setUser(user);
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
