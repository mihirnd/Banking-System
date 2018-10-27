import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredService } from '../services/login-cred.service';
import { IUser } from '../user-details';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { IAccount } from '../account-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [LoginCredService, AccountsService]
})
export class DashboardComponent implements OnInit {
  private user: IUser;
  public selectAccountForm: FormGroup;
  public accounts: IAccount[];
  public account: IAccount;
  public isDetails = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private loginCredService: LoginCredService,
    private accountsService: AccountsService) {
      this.selectAccountForm = fb.group({
        accid: ['']
      });
    }

  ngOnInit() {
    this.user = this.loginCredService.getUser();
    this.accountsService.getAccounts(this.user.uid).subscribe(
      (res: IAccount[]) => {
        console.log(res);
        this.accounts = res;
      }
    );
  }


  getDetails() {
    console.log(this.selectAccountForm.value.accid);
    const url = 'http://localhost:8100/account-details';
    const httpOptions = {
      headers: new HttpHeaders({
        accid: this.selectAccountForm.value.accid
      })
    };
    this.http.get(url, httpOptions).subscribe(
      res => {
        console.log(res);
        this.account = res[0];
        this.isDetails = true;
      }
    );
  }


  checkBalance() {
    const headers = {
      headers: new HttpHeaders({
        // accid: this.accid
      })
    };
    this.http.get('http://localhost:8100/balance', headers).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  transferFunds() {
  this.router.navigate(['/fund-transfer']);

  }
}
