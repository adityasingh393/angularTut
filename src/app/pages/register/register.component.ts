import { Component, NgModule, OnInit } from '@angular/core';
// import { Register } from '../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../component/button/button.component';
import localforage from 'localforage';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { NotificationServices } from '../../services/notification.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    CommonModule,
    KENDO_BUTTON,
    TranslateModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // registerData: Register;
  registerForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationServices: NotificationServices,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      age: [18, [Validators.required, Validators.min(18)]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.http
      .post('http://localhost:4000/auth/register', this.registerForm.value, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        if (!res.result) {
          localStorage.setItem(
            'userSessionToken',
            res.authentication.sessionToken,
          );
          this.notificationServices.show('success', 'Registration Successful');
          localforage.removeItem('otpVerificationStatus');
          this.router.navigateByUrl('/home');
        } else {
          alert(res.message);
        }
      });
  }
  onClickLogin() {
    this.router.navigateByUrl('/login');
  }
  VerifyOtpButtonClick() {
    this.router.navigateByUrl('/verify-email');
  }
}
