import { Component, NgModule } from '@angular/core';
import { Register } from '../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../component/button/button.component';
import localforage from 'localforage';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { NotificationServices } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ButtonComponent, KENDO_BUTTON],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerData: Register;
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationServices: NotificationServices,
  ) {
    this.registerData = {
      email: '',
      userName: '',
      password: '',
      age: 18,
      phoneNumber: '',
    };
  }
  onRegister() {
    this.http
      .post('http://localhost:4000/auth/register', this.registerData, {
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
