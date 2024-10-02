import { Component, NgModule } from '@angular/core';
import { Register } from '../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerData: Register;
  constructor(private http: HttpClient, private router: Router) {
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
      .post('http://localhost:4000/auth/register', this.registerData)
      .subscribe((res: any) => {
        if (!res.result) {
          localStorage.setItem('userEmail', this.registerData.email);
          alert('registration succesful');
          this.router.navigateByUrl('/home');
        } else {
          alert(res.message);
        }
      });
  }
}
