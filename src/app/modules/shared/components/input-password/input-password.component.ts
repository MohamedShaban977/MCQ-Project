import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {


  @Input() titleLabel: string = 'Password';
  @Input() formControlName: string = 'Password';
  @Input() control!: FormControl;



  visiblePassword: boolean = false;

  showPass() {
    this.visiblePassword = !this.visiblePassword;

  }

}
