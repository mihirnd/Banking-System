import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  fileForm: FormGroup;
  constructor(fb: FormBuilder, private http: HttpClient) {
    this.fileForm = fb.group({
      file: ['null']
    });
  }

}
