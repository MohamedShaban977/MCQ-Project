import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePassword } from 'src/app/core/validations/validations';
import { UserTypeEnum } from 'src/app/core/enums/user-type-enum';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { UserStudentModel } from 'src/app/models/register-model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  visiblePassword: boolean = false;

  loginFormGroup!: FormGroup;
  emailCon!: FormControl;
  passwordCon!: FormControl;
  allUsers!: UserStudentModel[];
  userType: string = UserTypeEnum.student;

  constructor(private toaster: ToastrService,
    private service: AuthService,
    private router: Router) {
    // this.loginService.getIsLoading().subscribe((isLoading: boolean) => {
    //   this.isLoading = isLoading;
    //   console.log(this.isLoading);


    // })
  }



  ngOnInit(): void {
    this.getAllUsers(UserTypeEnum.student);
    this.initFormControl();
    this.createForm();
  }

  getRoleUser(event: any) {
    console.log(event.target.value);
    this.getAllUsers(event.target.value);
    this.userType = event.target.value;

  }
  getAllUsers(userType: UserTypeEnum) {
    this.service.getAllUsers(userType).subscribe({
      next: (res) => {
        this.allUsers = res;
        console.log(this.allUsers);
      }
    })
  }

  showPass() {
    this.visiblePassword = !this.visiblePassword;
  }


  initFormControl() {
    this.emailCon = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCon = new FormControl('', [Validators.required, ValidatePassword]);
  }

  createForm() {
    this.loginFormGroup = new FormGroup({
      emailCon: this.emailCon,
      passwordCon: this.passwordCon,
    },);
  }

  validUserEmail(): string | null {
    if (this.emailCon.errors?.['required']) {
      return 'Email is required';
    }

    else if (this.emailCon.errors?.['email']) {
      return 'Email is correct';
    }
    return null
  }

  validPassword(): string | null {
    if (this.passwordCon.errors?.['required']) {
      return 'Password is required';
    }

    else if (this.passwordCon.errors?.['invalidStrongPassword']) {
      return 'Password must be strong characters'
    }

    return null
  }

  submit() {
    this.isLoading = true;

    let index: number = this.allUsers.findIndex(item => item.email == this.loginFormGroup.value.emailCon && item.password == this.loginFormGroup.value.passwordCon)

    console.log(this.loginFormGroup.value);

    setTimeout(() => {
      if (index == -1) {
        this.toaster.error('الايميل او كلمة المرور غير صحيحة');
        this.isLoading = false;
      }
      else {
        const model = {
          userName: this.allUsers[index].userName,
          role: this.userType
        }
        this.service.login(model).subscribe({
          next: (res) => {
            // console.log(res);
            this.toaster.success('login successfully');
            this.service.user.next(res);
            this.router.navigate(['/subject/subjects']);
            this.isLoading = false;
          }
        })
      }
    }, 2000);
  }

}
