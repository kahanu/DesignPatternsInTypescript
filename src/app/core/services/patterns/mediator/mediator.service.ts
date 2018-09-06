import { Injectable } from '@angular/core';
import { HttpBase } from '../../../http-base';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '../../exception.service';

@Injectable()
export class MediatorService extends HttpBase<any> {

  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    super(http, exceptionService);
  }

  /** Add any custom service methods here. */
}
