import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInfo } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import localforage from 'localforage';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, KENDO_BUTTON, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService:AuthService
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
   this.authService.logoutUser()
  }
  editdata(id: string) {
    this.router.navigateByUrl(`/edit-user-details/${id}`);
  }
  onUploadClick() {
    this.router.navigateByUrl('/upload-image');
  }
}
