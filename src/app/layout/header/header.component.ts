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
  constructor(private router:Router){}
  userLogged: boolean = false;
  selectedOption!: String |null;
  async ngOnInit() {
    try {
      const cookie = await localforage.getItem('cookie');
      // console.log(cookie)
      this.userLogged = !!cookie;
    } catch (error) {
      console.error('Error retrieving cookie:', error);
    }
  }
  onChangeOption(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
    if(this.selectedOption==="logout"){
      this.router.navigateByUrl('/login');
      localforage.removeItem('cookie');
      localforage.removeItem('role');
    }
    if(this.selectedOption==="home"){
      this.router.navigateByUrl("/home");
    }
    console.log("selectedOption:", this.selectedOption);
  }
}
