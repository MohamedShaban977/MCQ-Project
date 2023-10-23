import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/service/crud.service';
import { UserStudentModel } from 'src/app/models/register-model';
import { Observable, Subject } from 'rxjs';
import { UserTypeEnum } from 'src/app/core/enums/user-type-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private crudService: CrudService) { }

  getAllUsersStudent(): Observable<UserStudentModel[]> {
    return this.crudService.get<UserStudentModel[]>(this.crudService.BaseUrl, 'student');

  }

  getAllUsersDoctor(): Observable<UserStudentModel[]> {
    return this.crudService.get<UserStudentModel[]>(this.crudService.BaseUrl, 'doctor');

  }

  getAllUsers(userType: UserTypeEnum): Observable<UserStudentModel[]> {
    return this.crudService.get<UserStudentModel[]>(this.crudService.BaseUrl, userType);
  }

  login(model: any) {
    return this.crudService.put(this.crudService.BaseUrl, 'login/1', model);

  }

  createUserStudent(model: UserStudentModel) {

    return this.crudService.post(this.crudService.BaseUrl, 'student', model);
  }


  user = new Subject<any>()
  getRoleUser() {
    return this.crudService.get(this.crudService.BaseUrl, 'login/1').subscribe(data => {
      console.log("From auth service: ", data);

      this.user.next(data);
    });

  }
}
