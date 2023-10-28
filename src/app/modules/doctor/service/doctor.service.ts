import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private crudService: CrudService) { }


  addNewExam(model: any) {

    return this.crudService.post(this.crudService.BaseUrl, 'subjects', model);
  }
}
