import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/auth';
import { StringInputComponent } from '../../component/input-field/input-field.component';
import { CommonModule } from '@angular/common';
import localForage from 'localforage';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, StringInputComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData: Login;
  constructor(
    private http: HttpClient,
    private router: Router,
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
        localForage.setItem('role', res.role);
        if (!res.result) {
          localForage.setItem('cookie', res.authentication.sessionToken);
          this.router.navigateByUrl('/home');
        } else {
          alert(res.message);
        }
      });
  }
  onClickRegister() {
    this.router.navigateByUrl('/register');
  }
}
