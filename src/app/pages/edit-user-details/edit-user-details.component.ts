import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserEditData } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.css',
})
export class EditUserDetailsComponent {
  UserEditData: UserEditData;
  constructor(private router: Router) {
    this.UserEditData = {
      userName: '',
      age: 0,
      phoneNumber: '',
    };
  }
  ngOnInit() {
    this.UserEditData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log(this.UserEditData);
  }
  onSave() {
    //  const changedAge= this.UserEditData.age;
    //  const changedUserName=this.UserEditData.userName;
    //  const changedPhoneNumber=this.UserEditData.phoneNumber;
    localStorage.setItem('userDetails', JSON.stringify(this.UserEditData));
    this.router.navigateByUrl('/home');
  }
}
