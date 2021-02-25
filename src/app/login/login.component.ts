import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hidePassword: boolean = true;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  getOneTimeToken() {
    let currentDate = new Date().toISOString();
    let currentTime = currentDate.split('T')[1];
    let currentTimeSplit = currentTime.split(':');
    let oneTimeCode = currentTimeSplit[0] + currentTimeSplit[1];
    return oneTimeCode;
  }

  submit() {
    // i like using formGroups over individual formControls
    // as you get functionality like this where if any control
    // is invalid the form itself is invalid..Angular 10+ has
    // has apparently made formGroups finicky as it messes with
    // TS strictTemplates but there are workarounds
    // new the control and referencing it in the group or As in getter?
    if (this.formGroup.invalid) return;
    const oneTimeToken = this.getOneTimeToken();
    // need submission logic
  }

  get emailControl() {
    return this.formGroup.get('email');
  }

  get emailControlErrorText() {
    if (this.emailControl?.hasError('email')) return 'Invalid email address!'
    return 'A email address is required!'
  }

  get passwordControl() {
    return this.formGroup.get('password');
  }

}
