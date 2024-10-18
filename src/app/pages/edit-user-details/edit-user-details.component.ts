import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserEditData } from '../../interfaces/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { NotificationServices } from '../../services/notification.service';
import { ConfirmDailogComponent } from '../../component/confirm-dailog/confirm-dailog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [FormsModule, KENDO_BUTTON, ConfirmDailogComponent, CommonModule],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.css',
})
export class EditUserDetailsComponent {
  UserEditData: UserEditData;
  _id: string = '';
  isDailogOpen: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private notificationService: NotificationServices,
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
      this.UserEditData.id = this._id;
    });
  };

  ngOnInit() {
    this.getID();
    const getuserData = async (id: string) => {
      await this.http
        .post('http://localhost:4000/user/getUserInfoById', { id })
        .subscribe((data: any) => {
          this.UserEditData = data;
        });
    };
    getuserData(this._id);
  }
  openDailogBox() {
    this.isDailogOpen = true;
  }
  closeDailogBox() {
    this.isDailogOpen = false;
  }

  onSave() {
    console.log('confirm button clicked   ');
    this.http
      .put('http://localhost:4000/user/updateUserById', this.UserEditData)
      .subscribe((res: any) => {
        this.notificationService.show('success', 'changes has been saved');
        this.isDailogOpen = false;
      });
  }
}
