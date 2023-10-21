import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusCode } from './status-code';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }
  logError(error: HttpErrorResponse) {
    if (error.status === StatusCode.unauthorized) {


    }
  }
}
