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
    const currentDateUTC = currentDate.toUTCString();
    const currentUTCTime = currentDateUTC.split(' ')[4];
    const currentUTCTimeSplit = currentUTCTime.split(':');
    // parsing int here to remove leading 0s
    const UTCHour = parseInt(currentUTCTimeSplit[0]);
    const UTCMinute = parseInt(currentUTCTimeSplit[1]);
    const oneTimeCode = `${UTCHour}${UTCMinute}`
    return parseInt(oneTimeCode);
  }

  async submitLogin(loginInfo: LoginInfo): Promise<Response> {
    const currentDate = new Date();
    const oneTimeCode = this.getOneTimeToken(currentDate);

    const fetchResponse = await fetch(`${environment.API_URL}/login`, {
      method: 'post',
      body: JSON.stringify({
        oneTimeCode,
        ...loginInfo
      })
    });
    return fetchResponse;
  }

  getLoginFormGroup() {
    const letterNumberSymbolRegex = '^[a-zA-Z0-9`~!@#$%^&*()_\\-\\+=|\\"\':;?/>.\\\<\\[\\}\\],\\{]*$';
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(letterNumberSymbolRegex)])
    })
  }
}
