import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { StrongPasswordRegex } from "../regx";

export function ValidateName(control: AbstractControl) {


    if (control.value.match(/[0-9]/g)) {
        return { invalidName: true }
    }
    return null;
}


export function ValidatePassword(control: AbstractControl) {

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

        if (password?.value !== control?.value) {
            return { invalidConfirmPassword: true }
        }
        return null;

    }
}



export function ValidateUserName(nameRegex: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {

        if (control.value.match(nameRegex)) {
            return { invalidUserName: true }
        }
        return null

    }
}
