import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { UserStudentModel } from 'src/app/models/register-model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {


  constructor(private fb: FormBuilder,
    private toaster: ToastrService,
    private service: AuthService,
    private router: Router,
  ) { }

  formGroup!: FormGroup;
  allUsers!: UserStudentModel[];
  isLoading: boolean = false

  createForm() {
    this.formGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }


  get userName() { return this.formGroup.get('userName'); }
  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }
  get confirmPassword() { return this.formGroup.get('confirmPassword'); }
  getControlByName(controlName: string) { return this.formGroup.get(controlName) }


  getAllUserStudent() {
    this.service.getAllUsersStudent().subscribe({
      next: (res) => {
        this.allUsers = res;
        console.log(this.allUsers);
      }
    })
  }


  submit(model: UserStudentModel) {
    this.isLoading = true;
    let index: number = this.allUsers.findIndex(item => item.email === this.formGroup.value.email)
    if (index !== -1) {
      this.toaster.error('Email already exists');
      this.isLoading = false;
    }
    else {
      this.service.createUserStudent(model).subscribe({
        next: (res) => {
          console.log(res);
          this.toaster.success('User add been successfully');
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      })
    }
  }


}

