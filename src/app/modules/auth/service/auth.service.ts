import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/service/crud.service';
import { UserStudentModel } from 'src/app/models/register-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private crudService: CrudService) { }

  getAllUsersStudent(): Observable<UserStudentModel[]> {
    return this.crudService.get<UserStudentModel[]>(this.crudService.BaseUrl, 'student');

  }

  createUserStudent(model: UserStudentModel) {

    return this.crudService.post(this.crudService.BaseUrl, 'student', model);
  }
}
