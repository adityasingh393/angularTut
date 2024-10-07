import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // constructor(private http: HttpClient) {}
  constructor(private router: Router) {}
  userInfo: UserInfo = {
    _id:'',
    email: '',
    phoneNumber: '',
    age: 0,
    userName: '',
  };

  ngOnInit() {
    // const email = localStorage.getItem('userEmail');
    // console.log(email);
    // if (email) {
    //   this.getUserDetails(email);
    // }
    this.userInfo = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log('userDetails', this.userInfo.age);
  }
  onLogOut() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userSessionToken');
  }
  editdata(id:string) {
    this.router.navigateByUrl(`/edit-user-details/${id}`);
  }
  onUploadClick() {
    this.router.navigateByUrl('/upload-image');
  }
}
