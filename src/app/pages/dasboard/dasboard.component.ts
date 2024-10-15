import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [ChartModule,SidebarComponent],
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent {
  basicData: any;
  basicOptions: any;
  usersData: any;

  constructor(private http: HttpClient) {}

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
        this.usersData = data;
        console.log(this.usersData,"saved users data ");
        this.updateChart('daily');

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

  onChangeOption(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(selectedOption, 'selectedOption');
    this.updateChart(selectedOption);
  }
  updateChart(range: string) {
    let labels: string[] = [];
    let data: number[] = [];

    if (range === 'daily') {
      labels = ['Today', '5 Days Ago', '10 Days Ago'];
      data = [
        this.usersData.days.today.length,
        this.usersData.days.fiveDays.length,
        this.usersData.days.tenDays.length,
      ];
    } else if (range === 'monthly') {
      labels = ['1 Month', '3 Months', '6 Months'];
      data = [
        this.usersData.monthly.oneMonth.length,
        this.usersData.monthly.threeMonth.length,
        this.usersData.monthly.sixMonth.length,
      ];
    } else if (range === 'yearly') {
      labels = ['1 Year', '5 Years', '10 Years'];
      data = [
        this.usersData.yearly.oneYear.length,
        this.usersData.yearly.fiveYear.length,
        this.usersData.yearly.tenYears.length,
      ];
    }
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Users Registered',
          data: data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
