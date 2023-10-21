import { Component } from '@angular/core';

import { UserStudentModel } from 'src/app/models/register-model';
import { RegisterService } from './service/register.service';
import { ToggleIsLoading } from 'src/app/modules/shared/animations/toggle-isLoading';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateConfirmPassword, ValidateName, ValidatePassword, ValidateUserName } from 'src/app/core/validations/validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [ToggleIsLoading]
})
export class RegisterComponent {
  isLoading: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  type: string = 'password';
  isText: boolean = false;


  myFormGroup!: FormGroup;

  passwordFG!: FormGroup;
  userNameCon!: FormControl;
  emailCon!: FormControl;
  passwordCon!: FormControl;
  confirmPasswordCon!: FormControl;

  registerModel!: UserStudentModel;


  constructor(public registerService: RegisterService) {
    // this.registerService.getIsLoading().subscribe((isLoading: boolean) => {
    //   this.isLoading = isLoading;
    //   console.log(this.isLoading);


    // })

    this.initFormControl();
    this.createForm()




  }

  ngOnInit(): void {
    this.registerService.getAllUserStudent()

    // this.registerService.createForm()
  }
  // <i class="fa-regular fa-eye-slash"></i>
  hideShowPass() {
    this.isText = !this.isText
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  initFormControl() {
    this.userNameCon = new FormControl('', [Validators.required, ValidateName, ValidateUserName(/[A-Z]/g)]);
    this.emailCon = new FormControl('');
    this.passwordCon = new FormControl('', [Validators.required, ValidatePassword]);
    this.confirmPasswordCon = new FormControl('', [Validators.required, Validators.minLength(6), ValidateConfirmPassword(this.passwordCon)]);
  }

  createForm() {
    this.passwordFG = new FormGroup({
      passwordCon: this.passwordCon,
      confirmPasswordCon: this.confirmPasswordCon,

    },
    )

    this.myFormGroup = new FormGroup({
      userNameCon: this.userNameCon,
      emailCon: this.emailCon,
      passwordG: this.passwordFG,
    },);


  }



  validUserName(): string | null {


    if (this.userNameCon.errors?.['required']) {

      return 'User name is required';
    }

    else if (this.userNameCon.errors?.['invalidName']) {
      return 'User name cant include a number'
    }
    else if (this.userNameCon.errors?.['invalidUserName']) {
      return 'User name cant include a Capital case letter'
    }
    return null
  }

  validPassword(): string | null {
    if (this.passwordCon.errors?.['required']) {
      return 'Password is required';
    }

    // else if (this.passwordCon.errors?.['minLength'] !== null) {
    //   return 'Password must be at least 6 characters'
    // }

    else if (this.passwordCon.errors?.['invalidStrongPassword']) {
      return 'Password must be strong characters'
    }

    return null
  }

  validConfirmPassword(): string | null {
    if (this.confirmPasswordCon.errors?.['required']) {
      return 'Confirm Password is required';
    }

    else if (this.confirmPasswordCon.errors?.['minLength']) {
      return 'Confirm Password must be at least 6 characters'
    }

    else if (this.confirmPasswordCon.errors?.['invalidConfirmPassword']) {
      return 'Confirm password does not match the password'
    }

    return null
  }



  submit() {
    console.log('rrrrrrrrrrr');

    this.registerModel = {
      userName: this.registerService.userName?.value,
      email: this.registerService.email?.value,
      password: this.registerService.password?.value,
    }

    this.registerService.submit(this.registerModel);




  }
}
