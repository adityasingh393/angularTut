import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  constructor(private http: HttpClient, private router: Router) {}
  allUsers: User[] = [];
  // displayedColumns: string[] = [
  //   'position',
  //   'name',
  //   'weight',
  //   'symbol',
  //   'actions',
  // ];
  // dataSource = new MatTableDataSource<User>(this.allUsers);

  // @ViewChild(MatPaginator) paginator!:MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;

  //   console.log('this.dataSource', this.dataSource.paginator)
  // }
  ngOnInit() {
    this.http
      .get<User[]>('http://localhost:4000/user/allUsers')
      .subscribe((data) => {
        this.allUsers = data;
        console.log('this.allUsers', this.allUsers);
        // this.dataSource = data;
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
