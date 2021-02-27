import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginForm: FormGroup;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
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
    const response = await this.loginService.submitLogin(this.loginForm.value);
    if (!response.ok) {
      // Could do a modal here but typically avoid modals
      // as theyre not great for accessibility so
      // i just newed up another component
      this.router.navigateByUrl('/error')
    } else {
      window.location.href = 'http://onecause.com/'
    }
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
