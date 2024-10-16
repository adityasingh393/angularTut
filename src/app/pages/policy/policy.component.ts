import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { policyData } from '../../interfaces/policy';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from "../../component/sidebar/sidebar.component";

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [FormsModule, SidebarComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css',
})
export class PolicyComponent {
  policyData: policyData;
  _id: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.policyData = {
      title: '',
      category: '',
      content: '',
    };
  }
  getId = async () => {
    await this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.policyData.id = this._id;
      console.log(this.policyData.id, 'id');
    });
  };
  getPolicyData = async (id: string) => {
    await this.http
      .post(
        'http://localhost:4000/admin/policy/getPolicy',
        { id },
        {
          withCredentials: true,
        },
      )
      .subscribe((data: any) => {
        this.policyData = data;
      });
  };
  ngOnInit() {
    this.getId();
    this.getPolicyData(this._id);
  }

  onClick() {
    this.http
      .put(
        'http://localhost:4000/admin/policy/update-policy',
        this.policyData,
        { withCredentials: true },
      )
      .subscribe((res: any) => {
        alert('your changes has been saved');
      });
  }
}
