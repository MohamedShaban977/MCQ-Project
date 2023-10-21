import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { StrongPasswordRegex } from "../regx";

export function ValidateName(control: AbstractControl) {

    console.log('in validation is', control);

    if (control.value.match(/[0-9]/g)) {
        return { invalidName: true }
    }
    return null;
}


export function ValidatePassword(control: AbstractControl) {

    console.log('ValidatePassword', control.errors);

    if (!control.value.match(StrongPasswordRegex)) {
        return { invalidStrongPassword: true }
    }
    return null;
}

// export function ValidateConfirmPassword(control: AbstractControl) {

//     console.log('ValidatePassword', control.errors);

//     if (control.value.match(StrongPasswordRegex)) {
//         return { invalidStrongPassword: true }
//     }
//     return null;
// }

export function ValidateConfirmPassword(password: AbstractControl): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log('ValidateConfirmPassword', control.errors);

        if (password?.value !== control?.value) {
            return { invalidConfirmPassword: true }
        }
        return null;

    }
}



export function ValidateUserName(nameRegex: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log('in validation is', control);

        if (control.value.match(nameRegex)) {
            return { invalidUserName: true }
        }
        return null

    }
}


// export function validatePassword(form: AbstractControl): { [key: string]: boolean } | null {
//     console.log('in validation password is', form);

//     const password = form.get('passwordCon')
//     const confirmPassword = form.get('confirmPasswordCon')

//     if (password?.value !== confirmPassword?.value) {
//         return { invalidConfirmPassword: true }
//         //  confirmPassword.setErrors({ invalidConfirmPassword: true })
//     }
//     //  confirmPassword.setErrors(null)
//     return null;
// }