import { Component } from '@angular/core';

import { UserStudentModel } from 'src/app/models/register-model';
import { RegisterService } from './service/register.service';
import { ToggleIsLoading } from 'src/app/modules/shared/animations/toggle-isLoading';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateConfirmPassword, ValidateName, ValidatePassword, ValidateUserName } from 'src/app/core/validations/validations';
import { emailValidator } from 'src/app/core/validations/async-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // animations: [ToggleIsLoading]
})
export class RegisterComponent {

  isLoading: boolean = false;
  visiblePassword: boolean = false;
  visibleConfirmPassword: boolean = false;


  myFormGroup!: FormGroup;

  userNameCon!: FormControl;
  emailCon!: FormControl;
  passwordCon!: FormControl;
  confirmPasswordCon!: FormControl;

  registerModel!: UserStudentModel;


  constructor(public registerService: RegisterService) {

    this.registerService.getIsLoading().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
      console.log(this.isLoading);


    })



  }

  ngOnInit(): void {
    this.registerService.getAllUserStudent()

    this.initFormControl();
    this.createForm()

  }

  showPass() {
    this.visiblePassword = !this.visiblePassword;

  }
  showConfirmPass() {
    this.visibleConfirmPassword = !this.visibleConfirmPassword;

  }



  initFormControl() {
    this.userNameCon = new FormControl('', [Validators.required, ValidateName, ValidateUserName(/[A-Z]/g)]);
    this.emailCon = new FormControl(
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailValidator()],
        updateOn: 'blur'

      }
    );
    this.passwordCon = new FormControl('', [Validators.required, ValidatePassword]);
    this.confirmPasswordCon = new FormControl('', [Validators.required, Validators.minLength(6), ValidateConfirmPassword(this.passwordCon)]);
  }

  createForm() {
    this.myFormGroup = new FormGroup({
      userNameCon: this.userNameCon,
      emailCon: this.emailCon,
      passwordCon: this.passwordCon,
      confirmPasswordCon: this.confirmPasswordCon,
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

  validUserEmail(): string | null {


    if (this.emailCon.errors?.['required']) {

      return 'Email is required';
    }

    else if (this.emailCon.errors?.['email']) {
      return 'Email is correct';
    }
    return null
  }

  validUserEmailAsync(): string | null {


    if (this.emailCon.errors?.['userNameExist']) {

      return 'Email is already exists';
    }
    return '';
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
      userName: this.userNameCon?.value,
      email: this.emailCon?.value,
      password: this.passwordCon?.value,
    }

    this.registerService.submit(this.registerModel);




  }
}
