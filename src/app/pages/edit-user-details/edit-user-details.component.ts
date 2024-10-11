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
   getID = async () => {
    await this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.UserEditData.id=this._id;
    });
  };
  ngOnInit() {
    this.getID();
    const getuserData = async (id: string) => {
      console.log("insdie ge ",id)
      await this.http
        .post('http://localhost:4000/user/getUserInfoById',{ id})
        .subscribe((data: any) => {
          console.log(data);
          this.UserEditData = data;
          console.log(this.UserEditData, "from getuserdata")
        });
    };
    getuserData(this._id);
  }
  onSave() {
    this.http.put('http://localhost:4000/user/updateUserById', this.UserEditData).subscribe((res:any)=>{
      console.log(res,"from put api in edit user detailes")
    })
  }
}
