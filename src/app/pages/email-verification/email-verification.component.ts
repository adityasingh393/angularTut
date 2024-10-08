import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailVerificationData } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export class EmailVerificationComponent {
  emailVerificationData: EmailVerificationData;
  emailVerification: boolean = true;
  constructor(private http: HttpClient, private router: Router) {
    this.emailVerificationData = {
      email: '',
      otp: '',
    };
  }

  sendOtpButton() {
    this.http
      .post(
        'http://localhost:4000/auth/otp-generate',
        this.emailVerificationData
      )
      .subscribe((res: any) => {
        console.log(res.success);
        alert('otp sent succesfully');
      });
  }

  verifyOtpButton() {
    this.http
      .post('http://localhost:4000/auth/verify-otp', this.emailVerificationData)
      .subscribe((res: any) => {
        this.router.navigateByUrl('/register');
      });
  }
}
