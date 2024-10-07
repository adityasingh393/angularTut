import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AllUsers, User } from '../../interfaces/allUsers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  constructor(private http: HttpClient, private router: Router) {}

  allUsers: User[] = [];
  ngOnInit() {
    this.http
      .get('http://localhost:4000/auth/allUsers')
      .subscribe((data: any) => {
        this.allUsers = data;
        console.log(data);
      });
    
  }
  OnEditButtonClick(user:User) {
    this.router.navigateByUrl(`/edit-user-details/${user._id}`, {
      state: { userDetails: user },
    });
  }
}
