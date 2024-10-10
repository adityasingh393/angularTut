import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserEditData } from '../../interfaces/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.css',
})
export class EditUserDetailsComponent {
  UserEditData: UserEditData;
  _id: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.UserEditData = {
      userName: '',
      age: 0,
      phoneNumber: '',
    };
  }
  ngOnInit() {
    const getID = async () => {
      await this.route.params.subscribe((params) => {
        this._id = params['id'];
        console.log('Test ID:', this._id);
      });
    };
    getID();
    const getuserData = async (id: string) => {
      console.log("insdie ge ",id)
      await this.http
        .post('http://localhost:4000/user/getUserInfoById',{ id})
        .subscribe((data: any) => {
          console.log(data);
          this.UserEditData = data;
        });
    };
    getuserData(this._id);
  }
  onSave() {
    //  const changedAge= this.UserEditData.age;
    //  const changedUserName=this.UserEditData.userName;
    //  const changedPhoneNumber=this.UserEditData.phoneNumber;
    localStorage.setItem('userDetails', JSON.stringify(this.UserEditData));
    this.router.navigateByUrl('/home');
  }
}
