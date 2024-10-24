import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/auth';
import { StringInputComponent } from '../../component/input-field/input-field.component';
import { CommonModule } from '@angular/common';
import localForage from 'localforage';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { NotificationServices } from '../../services/notification.service';
import { TranslateModule } from '@ngx-translate/core';
import localforage from 'localforage';
import { AuthService } from '../../services/auth.service';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    StringInputComponent,
    CommonModule,
    KENDO_BUTTON,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData: Login;
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationServices: NotificationServices,
    // private changeDetector:ChangeDetectorRef
    private authService:AuthService
  ) {
    this.loginData = {
      email: '',
      password: '',
    };
  }
  onLogin() {
    this.http
      .post('http://localhost:4000/auth/login', this.loginData, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        localforage.setItem('role', res.role);
        if (res) {
          console.log('sres', res);
          console.log('res,result', res.result);
          this.authService.loginUser(res.authentication.sessionToken, res.role);
          this.notificationServices.show(
            'success',
            'Logged In Successful',
            'center',
            'top',
          );
          localforage.setItem('cookie', res.authentication.sessionToken);
          this.router.navigateByUrl('/home');
          // this.changeDetector.detectChanges()
        } else {
          alert(res.message);
        }
      });
  }
  onClickRegister() {
    this.router.navigateByUrl('/register');
  }
}
