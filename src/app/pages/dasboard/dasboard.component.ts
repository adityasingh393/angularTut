import { Component } from '@angular/core';
import { User } from '../../interfaces/allUsers';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
})
export class DasboardComponent {
  constructor(private http: HttpClient, private router: Router) {}
  allUsers: User[] = [];
  basicData: any;
  basicOptions: any;
  allUsersLength!: number;
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.http
      .get<User[]>('http://localhost:4000/user/allUsers', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.allUsers = data;
        this.allUsersLength = this.allUsers.length;
      });

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Users',
          data: [11, 30, 70, 60],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
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
