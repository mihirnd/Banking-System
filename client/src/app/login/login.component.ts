import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredService } from '../services/login-cred.service';
import { IUser } from '../user-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginCredService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private loginCredService: LoginCredService
  ) {
    this.loginForm = fb.group({
      account_no: [''],
      password: ['']
    });
  }

  ngOnInit() {

    this.http.post('http://localhost:8100', {}).subscribe();
  }

  login() {
    console.log(this.loginForm.value.account_no);
    console.log(this.loginForm.value.password);
    const obj = {
      name: this.loginForm.value.account_no,
      pwd: this.loginForm.value.password
    };
    this.loginCredService.login(obj).subscribe(
      (res) => {
        console.log(res);
        if (res[0].name !== undefined) {
          console.log('Valid');
          this.loginCredService.setUser(res[0]);
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

  newUser() {
    this.router.navigate(['/new-user']);
  }
}
