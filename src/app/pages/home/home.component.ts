import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}
  userInfo: UserInfo = {
    email: '',
    phoneNumber: '',
    age: 0,
    userName: '',
  };

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    console.log(email);
    if (email) {
      this.getUserDetails(email);
    }
  }

  getUserDetails(email: string) {
    this.http
      .post<UserInfo>('http://localhost:4000/auth/userInfo', { email })
      .subscribe((data) => {
        console.log(data);
        this.userInfo = data;
      });
  }
}
