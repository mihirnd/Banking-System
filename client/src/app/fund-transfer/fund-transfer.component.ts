import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TransferFundsService } from '../services/transfer-funds.service';
import { ValidateAccService } from '../services/validate-acc.service';
import { LoginCredService } from '../services/login-cred.service';
import { CheckAvailabilityService } from '../services/check-availability.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css'],
  providers: [LoginCredService, ValidateAccService, CheckAvailabilityService, TransferFundsService]
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup;
  benValid = false;
  remValid = false;
  amountValid = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private validateAccService: ValidateAccService,
    private checkAvailabilityService: CheckAvailabilityService,
    private transferFundsService: TransferFundsService
  ) {
    this.fundTransferForm = fb.group({
      amount: ['', Validators.required],
      accidben: ['', Validators.required],
      accidrem: ['', Validators.required]

    });
  }


  ngOnInit() {
  }

  check() {

    if (this.benValid === false) {
      const accid = this.fundTransferForm.value.accidben;
      this.validateAccService.validate(accid).subscribe(
        res => {
          console.log(res);
          if (res === 'Valid Account') {
            this.benValid = true;
          }
        }

      );
    } else if (this.remValid === false) {
      const accid = this.fundTransferForm.value.accidrem;
      this.validateAccService.validate(accid).subscribe(
        res => {
          console.log(res);
          if (res === 'Valid Account') {
            this.remValid = true;
          }
        }

      );
    } else if (this.amountValid === false) {
      const accid = this.fundTransferForm.value.accidrem;
      const balance = this.fundTransferForm.value.amount;
      this.checkAvailabilityService.checkBalance(accid, balance).subscribe(
        res => {
          console.log(res);
          if (res === 'Sufficient Balance') {
            this.amountValid = true;
          }
        }

      );
    }


  }

  transferFunds() {
    if (this.fundTransferForm.valid) {
      console.log('Valid');
    }
    if (this.benValid === true && this.remValid === true && this.amountValid === true) {
      console.log('Transfer Init');
      const accidben = this.fundTransferForm.value.accidben;
      const accidrem = this.fundTransferForm.value.accidrem;
      const amount = this.fundTransferForm.value.amount;
      const obj = {
        accidben: accidben,
        accidrem: accidrem,
        amount: amount,
        otp: 0
      };

      this.transferFundsService.getOtp(obj).subscribe(
        res => {
          console.log(res);
          obj.otp = Number(JSON.stringify(res));
          this.transferFundsService.setTransferDetails(obj);
          this.router.navigate(['/confirm']);

        }
      );
    } else {
      console.log('Error');
    }
  }

  log() {
    console.log('Log');
  }
}
