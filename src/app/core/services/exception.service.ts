import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ExceptionService {

  constructor() { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <HttpErrorResponse>errorResponse;
    // console.log('error res: ', res);
    if (res.status === 404) {
      return Observable.throw('The web service was not found.');
    }

    return Observable.throw(res.statusText);

  }

}
