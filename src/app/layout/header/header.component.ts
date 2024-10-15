import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import localforage from 'localforage';
import { MatIconModule } from '@angular/material/icon';
import { authGuard } from '../../guards/auth.guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userLogged: boolean = false;
  isAdmin: boolean = false;
  dropdownOpen: boolean = false;

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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onChangeOption(option: string) {
    if (option === 'logout') {
      this.router.navigateByUrl('/login');
      localforage.removeItem('cookie');
      localforage.removeItem('role');
    }
    if (option === 'home') {
      this.router.navigateByUrl('home');
    }

    this.dropdownOpen = false;
  }
}
