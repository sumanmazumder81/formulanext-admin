import { Injectable } from '@angular/core';

import {BehaviorSubject} from 'rxjs'
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private count = 0;
  private spinner = new BehaviorSubject<string>('')
  constructor() { }

  getSpinnerObervable() : Observable<string>{
    console.log(this.spinner);
    return this.spinner.asObservable();
  }
  requestStarted() {
    if (++this.count === 1) {
      this.spinner.next('start');
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner.next('stop');
  }
}
