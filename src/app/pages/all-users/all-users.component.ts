import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllUsers, User } from '../../interfaces/allUsers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  allUsers: User[] = [];
  ngOnInit() {
    this.http
      .get<User[]>('http://localhost:4000/user/allUsers', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.allUsers = data;
      });
  }

  current_page: number = 1;
  rows: number = 5;
  DispalyList(page: number) {
    const start = this.rows * (page - 1);
    const end = start + this.rows;
    return this.allUsers.slice(start, end);
  }

  setPagination() {
    const page_count = Math.ceil(this.allUsers.length / this.rows);
    return Array.from({ length: page_count }, (_, i) => i + 1);
  }
  onPageChange(page: number) {
    this.current_page = page;
  }

  onEditButtonClick(user: User) {
    this.router.navigateByUrl(`/edit-user-details/${user._id}`, {
      state: { userDetails: user },
    });
  }
}
