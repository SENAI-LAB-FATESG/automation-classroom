import { Component } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: []
})
export class ErrorMsgComponent {

  public error: string;

  constructor() { }

  setError(error: string, time: number = 5000) {
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, time);
  }

}