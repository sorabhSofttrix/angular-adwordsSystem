import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  transformNgb(value: NgbDate) {
    return new Date(value.year, value.month - 1, value.day);
  }
}
