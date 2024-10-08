import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { AllUsers, User } from '../../interfaces/allUsers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  allUsers: User[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];

  ngOnInit() {
    this.http
      .get<User[]>('http://localhost:4000/auth/allUsers')
      .subscribe((data) => {
        this.allUsers = data;
        this.dataSource = data;
      });
  }

  dataSource: User[] = [];

  onEditButtonClick(user: User) {
    this.router.navigateByUrl(`/edit-user-details/${user._id}`, {
      state: { userDetails: user },
    });
  }
}
