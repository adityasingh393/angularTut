import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import localforage from 'localforage';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}
  userInfo: UserInfo = {
    _id: '',
    email: '',
    phoneNumber: '',
    age: 0,
    userName: '',
  };

  ngOnInit() {
    this.http
      .get('http://localhost:4000/user/getUserInfoBySessionId', {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.userInfo = res;
      });
  }
  onLogOut() {
    this.router.navigateByUrl('/login');
    localforage.removeItem('cookie');
    localforage.removeItem('role');
  }
  editdata(id: string) {
    this.router.navigateByUrl(`/edit-user-details/${id}`);
  }
  onUploadClick() {
    this.router.navigateByUrl('/upload-image');
  }
}
