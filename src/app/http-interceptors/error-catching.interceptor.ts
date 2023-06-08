import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { NotificationService } from '../notification.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(
    private toster: NotificationService
  ) { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Passed through the interceptor in request");

    return next.handle(request)
      .pipe(
        map(res => {
          // console.log("Passed through the interceptor in response");
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          // console.log(error);              
          let errorMsg = '';
          if (error.status == 401) {
            this.toster.showError('You need to login', 'Unauthorized');
            // return this.router.navigateByUrl('/login');
          }
          this.toster.showError((error.error ?.Message ? error.error.Message : "Something Went Wrong"), 'Server Side');
          // if (error.error instanceof ErrorEvent) {
          //   console.log(error);
          // } else {

          // }
          // console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
