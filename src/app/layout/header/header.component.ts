import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import localforage from 'localforage';
import { MatIconModule } from '@angular/material/icon';
import { authGuard } from '../../guards/auth.guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { DropDownButtonListType } from '../../interfaces/common';
import { SVGIcon, userIcon } from '@progress/kendo-svg-icons';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, KENDO_DROPDOWNBUTTON],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userLogged: boolean = false;
  isAdmin: boolean = false;
  profileIcon: SVGIcon = userIcon;
  dropDownButtonList: DropDownButtonListType[] = [
    { title: 'My Profile' }, // Use curly braces for object literals
    { title: 'Log Out' },
  ];
  constructor(private router: Router) {}
  async ngOnInit() {
    try {
      const cookie = await localforage.getItem('cookie');
      const role = await localforage.getItem('role');
      this.isAdmin = role === 'Admin';
      this.userLogged = !!cookie;
    } catch (error) {
      console.error('Error retrieving cookie:', error);
    }
  }

  onChangeOption(option: DropDownButtonListType) {
    if (option.title === 'Log Out') {
      this.router.navigateByUrl('/login');
      localforage.removeItem('cookie');
      localforage.removeItem('role');
    }
    if (option.title === 'My Profile') {
      this.router.navigateByUrl('home');
    }
  }
}
