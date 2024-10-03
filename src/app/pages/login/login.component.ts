import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/auth';
import { StringInputComponent } from '../../component/input-field/input-field.component';
import { CommonModule } from '@angular/common';
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
  constructor(private http: HttpClient, private router: Router) {
    this.loginData = {
      email: '',
      password: '',
    };
  }
  // debugger: any;
  onLogin() {
    // console.log(this.loginData);
    this.http
      .post('http://localhost:4000/auth/login', this.loginData)
      .subscribe((res: any) => {
        console.log(res);
        if (!res.result) {
          // console.log(
          //   'user data saved on logged in',
          //   res.authentication.sessionToken
          // );
          localStorage.setItem(
            'userSessionToken',
            res.authentication.sessionToken
          );
          localStorage.setItem('userDetails', JSON.stringify(res));
          // localStorage.setItem('userEmail', this.loginData.email);
          console.log('login dine');
          this.router.navigateByUrl('/home');
        } else {
          console.log('login fail');
          alert(res.message);
        }
      });
  }
  onClickRegister() {
    this.router.navigateByUrl('/register');
  }
}
