import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/dist/types/internal/Subject';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
import { Observable } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostUserEntityManagerService {
  listernerSubject = new Subject<any>();
  constructor() { }


  sendMessage(message: string) {
      this.listernerSubject.next({ Message: message });
  }
  sendMessageObj(message: any) {
      if(typeof message === 'object')
      {
        this.listernerSubject.next(message);
      }
  }

  // clearMessages() {
  //     this.listernerSubject.next();
  // }

  getMessage(): Observable<any> {
      return this.listernerSubject.asObservable();
  }
}
