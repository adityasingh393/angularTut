import { Component } from '@angular/core';
import { User } from '../../interfaces/allUsers';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { SidebarComponent } from "../../component/sidebar/sidebar.component";
@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [ChartModule, SidebarComponent],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
})
export class DasboardComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  allUsers: User[] = [];

  usersCreatedToday!: number;
  usersCreatedFiveDaysAgo!: number;
  usersCreatedTenDaysAgo!: number;

  basicData: any;
  basicOptions: any;
  allUsersLength!: number;
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.http
      .get<any>('http://localhost:4000/user/userCreatedAt', {
        withCredentials: true,
      })
      .subscribe((data) => {
console.log(data);
        this.usersCreatedToday=data.today.length
        this.usersCreatedFiveDaysAgo=data.fiveDays.length
        this.usersCreatedTenDaysAgo=data.tenDays.length
        this.allUsersLength=data.totalUser.length
        //this is being initalised here in the subscribe fucntion becuase before when it was outside of the subscribe fucntion
        // user length was being set on later and it was not taking the value

        //         The issue with your chart not displaying correctly seems related to how the datasets values are assigned. You're setting the chart's dataset based on this.allUsersLength,
        // but since this.allUsersLength is being updated asynchronously inside the subscribe function, the chart might be initialized before the user data is loaded.

        // To fix this, you can move the chart initialization into the subscribe block to ensure it happens after the user data is fetched and this.allUsersLength is updated.
        //  Here's how you can modify your ngOnInit() function
        // here is the link for better understangin https://chatgpt.com/share/670907fd-406c-8010-ba93-b526171c0d54
        this.basicData = {
          labels: ['today', 'in 3 days', 'in 5 days', 'total number of users'],
          datasets: [
            {
              label: 'No of user registered',
              data: [
               this.usersCreatedToday,
               this.usersCreatedFiveDaysAgo,
                this.usersCreatedTenDaysAgo,
                this.allUsersLength
              ],
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
      });
  }
}
