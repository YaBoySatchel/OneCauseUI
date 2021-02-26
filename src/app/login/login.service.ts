import { Injectable } from '@angular/core';
import { LoginInfo } from './login.model';
import { environment } from '../../environments/environment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly fb: FormBuilder) { }

  getOneTimeToken(currentDate: Date): number {
    const currentDateISO = currentDate.toISOString();
    const currentISOTime = currentDateISO.split('T')[1];
    const currentISOTimeSplit = currentISOTime.split(':');
    const oneTimeCode = currentISOTimeSplit[0] + currentISOTimeSplit[1];
    return parseInt(oneTimeCode);
  }

  async submitLogin(loginInfo: LoginInfo) {
    const currentDate = new Date();
    const oneTimeCode = this.getOneTimeToken(currentDate);

    const fetchResponse = await fetch(environment.API_URL, {
      method: 'post',
      body: JSON.stringify({
        oneTimeCode,
        ...loginInfo
      })
    });

    if (!fetchResponse.ok) {
      // Typically reroute to error page
      console.log(fetchResponse.status);
    } else {
      window.location.href = 'http://onecause.com/'
    }
  }

  getLoginFormGroup() {
    const letterNumberSymbolRegex = '^[a-zA-Z0-9`~!@#$%^&*()_\\-\\+=|\\"\':;?/>.\\\<\\[\\}\\],\\{]*$';
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(letterNumberSymbolRegex)])
    })
  }
}
