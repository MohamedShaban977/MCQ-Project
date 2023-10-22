import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { UserStudentModel } from 'src/app/models/register-model';
import { BehaviorSubject } from 'rxjs';
import { UserTypeEnum } from 'src/app/core/enums/user-type-enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private toaster: ToastrService,
    private service: AuthService,
    private router: Router,
  ) { }


  allUsers!: UserStudentModel[];
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  private setIsLoading(value: boolean) {
    this.isLoadingSubject.next(value);
  }



  getIsLoading() {
    return this.isLoadingSubject.asObservable();
  }


  getAllUsers(userType: UserTypeEnum) {
    console.log('getAllUsers');

    this.service.getAllUsers(userType).subscribe({
      next: (res) => {
        this.allUsers = res;
        console.log(this.allUsers);
      }
    })
  }

  submit(model: UserStudentModel) {
    this.setIsLoading(true);

    // let index: number = this.allUsers.findIndex(item => item.email === this.formGroup.value.email)

    setTimeout(() => {
      //   if (index !== -1) {
      //     this.toaster.error('Email already exists');
      //     this.setIsLoading(false);
      //   }
      //   else {
      this.service.createUserStudent(model).subscribe({
        next: (res) => {
          console.log(res);
          this.toaster.success('User add been successfully');
          this.router.navigate(['/login']);
          this.setIsLoading(false);
        }
      })
      // }
    }, 5000);


  }

}



