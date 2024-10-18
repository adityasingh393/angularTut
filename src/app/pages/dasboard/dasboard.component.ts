import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { DropDownButtonForGraph } from '../../interfaces/common';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [ChartModule, SidebarComponent, KENDO_DROPDOWNBUTTON],
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css'],
})
export class DasboardComponent {
  basicData: any;
  basicOptions: any;
  usersData: any;
  dropDownButtonList: DropDownButtonForGraph[] = [
    { title: 'Days', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
    { title: 'Yearly', value: 'yearly' },
  ];
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
        console.log(this.usersData, 'saved users data ');
        this.updateChart('daily');

        // this.basicOptions = {
        //   plugins: {
        //     legend: {
        //       labels: {
        //         color: textColor,
        //       },
        //     },
        //   },
        //   scales: {
        //     y: {
        //       beginAtZero: true,
        //       ticks: {
        //         color: textColorSecondary,
        //       },
        //       grid: {
        //         color: surfaceBorder,
        //         drawBorder: false,
        //       },
        //     },
        //     x: {
        //       ticks: {
        //         color: textColorSecondary,
        //       },
        //       grid: {
        //         color: surfaceBorder,
        //         drawBorder: false,
        //       },
        //     },
        //   },
        // };
      });
  }

  onChangeOption(event: DropDownButtonForGraph) {
    const selectedOption = event.value;
    console.log(selectedOption, 'selectedOption');
    this.updateChart(selectedOption);
  }
  updateChart(range: string) {
    let labels: string[] = [];
    let data: number[] = [];
    switch (range) {
      case 'daily':
        labels = ['Today', '5 Days Ago', '10 Days Ago'];
        data = [
          this.usersData.days.today.length,
          this.usersData.days.fiveDays.length,
          this.usersData.days.tenDays.length,
        ];
        break;

      case 'monthly':
        labels = ['1 Month', '3 Months', '6 Months'];
        data = [
          this.usersData.monthly.oneMonth.length,
          this.usersData.monthly.threeMonth.length,
          this.usersData.monthly.sixMonth.length,
        ];
        break;
      case 'yearly':
        labels = ['1 Year', '5 Years', '10 Years'];
        data = [
          this.usersData.yearly.oneYear.length,
          this.usersData.yearly.fiveYear.length,
          this.usersData.yearly.tenYears.length,
        ];
        break;
    }
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Users Registered',
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
