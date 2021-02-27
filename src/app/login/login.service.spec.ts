import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('LoginService', () => {
  let service: LoginService;
  let loginForm: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(LoginService);
    loginForm = service.getLoginFormGroup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct one time code', () => {
    let y2k = new Date('Sat, 01 Jan 2000 04:59:00 GMT');
    const oneTimeCode = service.getOneTimeToken(y2k);
    expect(oneTimeCode).toBe(459);
  });

  it('should correctly generate formgroup', () => {
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
  });

  it('should correctly validate valid formgroup', () => {
    let emailControl = loginForm.get('email');
    emailControl?.patchValue('email@email.com')
    let passwordControl = loginForm.get('password');
    passwordControl?.patchValue('APassword123');
    expect(emailControl?.valid).toBe(true);
    expect(passwordControl?.valid).toBe(true);
  });

  it('should correctly validate invalid formgroup', () => {
    let emailControl = loginForm.get('email');
    emailControl?.patchValue('email@email.')
    let passwordControl = loginForm.get('password');
    passwordControl?.markAsDirty();
    expect(emailControl?.valid).toBe(false);
    expect(passwordControl?.valid).toBe(false);
  });

  it('should correctly validate password regex', () => {
    let passwordControl = loginForm.get('password');
    passwordControl?.patchValue('~`!@#$%^&*()_-+=}]{["\':;?/>.<,')
    expect(passwordControl?.valid).toBe(true);
  });

  it('should correctly invalidate password regex', () => {
    let passwordControl = loginForm.get('password');
    passwordControl?.patchValue('©')
    expect(passwordControl?.valid).toBe(false);
  });
});
