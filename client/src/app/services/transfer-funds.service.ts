import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransferDetails } from '../transfer-details';

@Injectable()
export class TransferFundsService {
  static transferDetails: ITransferDetails;
  constructor(private http: HttpClient) { }

  getOtp(transferDetails: ITransferDetails) {

    const obj = {
      accidrem: transferDetails.accidrem,
      accidben: transferDetails.accidben,
      amount: transferDetails.amount
    };
    return this.http.post('http://localhost:8100/otp', obj);
  }

  getTransferDetails() {
    return TransferFundsService.transferDetails;
  }

  setTransferDetails(transferDetails: ITransferDetails) {
    TransferFundsService.transferDetails = transferDetails;

  }
  transfer(obj: ITransferDetails) {

    return this.http.post('http://localhost:8100/transfer', obj);
  }

}
