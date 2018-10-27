import { Component, OnInit } from '@angular/core';
import { ITransferDetails } from '../transfer-details';
import { TransferFundsService } from '../services/transfer-funds.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [TransferFundsService]
})
export class ConfirmationComponent implements OnInit {
  private transferDetails: ITransferDetails;
  public otpConfirmed = false;
  public otpForm: FormGroup;
  public accidben: number;
  public accidrem: number;
  public amount: number;
  public otp: number;
  constructor(private fb: FormBuilder, private transferFundService: TransferFundsService) {
    this.otpForm = fb.group({
      otp: [''],
    });
   }

  ngOnInit() {
    this.transferDetails = this.transferFundService.getTransferDetails();
    console.log(this.transferDetails);
    this.accidben = this.transferDetails.accidben;
    this.accidrem = this.transferDetails.accidrem;
    this.amount = this.transferDetails.amount;
    this.otp = this.transferDetails.otp;
  }
  checkOTP() {
    if (Number(this.otpForm.value.otp) === this.transferDetails.otp) {
      console.log('Confirmed');
      this.transferFundService.transfer(this.transferDetails).subscribe(
        res => {
          console.log(res);
          if (res === 'Success') {
            this.otpConfirmed = true;
          }
        }
      );
    } else {
      console.log();
      console.log();
    }
  }
}
