import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailVerificationData } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../component/button/button.component';
import localforage from 'localforage';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { NotificationServices } from '../../services/notification.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [FormsModule, CommonModule, KENDO_BUTTON, ButtonComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export class EmailVerificationComponent {
  emailVerificationData: EmailVerificationData;
  emailVerification: boolean = true;
  button: String = 'button';
  label: String = 'Send OTP';
  constructor(
    private http: HttpClient,
    private notificationServices: NotificationServices,
    private router: Router,
  ) {
    this.emailVerificationData = {
      email: '',
      otp: '',
    };
  }
  sendOtpButton() {
    this.http
      .post(
        'http://localhost:4000/auth/otp-generate',
        this.emailVerificationData,
      )
      .subscribe((res: any) => {
        this.notificationServices.show('success', 'otp sent on you email');
      });
  }

  verifyOtpButton() {
    this.http
      .post('http://localhost:4000/auth/verify-otp', this.emailVerificationData)
      .subscribe((res: any) => {
        this.notificationServices.show(
          'success',
          'Otp verifaication Successful',
        );
        localforage.setItem('otpVerificationStatus', 'done');
        this.router.navigateByUrl('/register');
      });
  }
}
