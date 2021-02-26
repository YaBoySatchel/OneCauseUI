import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginForm: FormGroup;

  constructor(private readonly loginService: LoginService) {
    this.loginForm = loginService.getLoginFormGroup();
  }

  getOneTimeToken() {
    let currentDate = new Date().toISOString();
    let currentTime = currentDate.split('T')[1];
    let currentTimeSplit = currentTime.split(':');
    let oneTimeCode = currentTimeSplit[0] + currentTimeSplit[1];
    return oneTimeCode;
  }

  async submit() {
    // i like using formGroups over individual formControls
    // as you get functionality like this where if any control
    // is invalid the form itself is invalid..Angular 10+
    // has apparently made formGroups finicky as it messes with
    // TS strictTemplates but there are workarounds
    // new the control and referencing it in the group or As in getter?
    if (this.loginForm.invalid) return;
    await this.loginService.submitLogin(this.loginForm.value);
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get emailControlErrorText() {
    if (this.emailControl?.hasError('email')) return 'Invalid email address!'
    return 'An email address is required!'
  }

  get passwordControlErrorText() {
    if (this.passwordControl?.hasError('required')) return 'A password is required!';
    return 'Invalid characters! ANSI accessible only';
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

}
