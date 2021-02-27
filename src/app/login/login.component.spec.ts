import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get invalid email error text', () => {
    component.loginForm.get('email')?.patchValue('email.com');
    expect(component.emailControlErrorText).toBe('Invalid email address!');
  });

  it('should get required email error text', () => {
    // though it starts empty, patching value first to insure
    // test state stays clean
    component.emailControl?.patchValue('');
    component.emailControl?.markAsDirty();
    expect(component.emailControlErrorText).toBe('An email address is required!');
  });

  it('should toggle password hide on button click', fakeAsync(() => {
    let passwordConcealer = fixture.debugElement.nativeElement.querySelector('#conceal-password-button');
    expect(component.hidePassword).toBe(true);
    passwordConcealer.click();
    tick();
    expect(component.hidePassword).toBe(false);
  }));

  it('should get required password error text', () => {
    component.passwordControl?.patchValue('');
    component.passwordControl?.markAsDirty();
    expect(component.passwordControlErrorText).toBe('A password is required!');
  });

  it('should get invalid password character error text', () => {
    component.passwordControl?.patchValue('©');
    component.passwordControl?.markAsDirty();
    expect(component.passwordControlErrorText).toBe('Invalid characters! ANSI accessible only');
  });

  it('should toggle password hide on button click', fakeAsync(() => {
    let passwordConcealer = fixture.debugElement.nativeElement.querySelector('#conceal-password-button');
    expect(component.hidePassword).toBe(true);
    passwordConcealer.click();
    tick();
    expect(component.hidePassword).toBe(false);
  }));
});
