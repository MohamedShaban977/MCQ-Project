import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStudentModel } from 'src/app/models/register-model';
import { AuthService } from '../../service/auth.service';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading: boolean = false;

  registerModel!: UserStudentModel;


  constructor(public registerService: RegisterService) {
    this.isLoading = registerService.isLoading
  }

  ngOnInit(): void {
    this.registerService.getAllUserStudent()
    this.registerService.createForm()
  }






  submit() {
    this.registerModel = {
      userName: this.registerService.userName?.value,
      email: this.registerService.email?.value,
      password: this.registerService.password?.value,

    }



  }
}
