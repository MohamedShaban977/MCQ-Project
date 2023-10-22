import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, delay, map } from "rxjs";
import { ajax } from 'rxjs/ajax'
import { UserStudentModel } from "src/app/models/register-model";

export function emailValidator(): AsyncValidatorFn {


    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        console.log('user.email ');

        return checkEmails().pipe(

            map(res => {
                console.log('res email is', res);
                let userNameExist: boolean = false;
                res.forEach(user => {
                    if (userNameExist) return;
                    userNameExist = user.email == control.value;



                })
                return userNameExist ? { userNameExist: true } : null
            })
        );
    }


    function checkEmails(): Observable<UserStudentModel[]> {
        console.log('checkEmails ');

        return ajax.getJSON<UserStudentModel[]>('http://localhost:3000/student').pipe(delay(1000))
    }
}