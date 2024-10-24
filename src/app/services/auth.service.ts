import { Injectable, signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ɵEmptyOutletComponent } from '@angular/router';
import { buttonIcon } from '@progress/kendo-svg-icons';
import localforage from 'localforage';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLogged = signal<boolean>(false);
  isAdmin = signal<boolean>(false);
  constructor() {}

  async checkUserStatus() {
    const cookie = await localforage.getItem('cookie');
    const role = await localforage.getItem('role');
    this.userLogged.set(!!cookie); // Update the signal with the new value
    this.isAdmin.set(role === 'Admin'); // Update the signal with the new value
  }

  async loginUser(sessionToken: string, role: string) {
    await localforage.setItem('cookie', sessionToken);
    await localforage.setItem('role', role);
    this.userLogged.set(true); // Set user as logged in
    this.isAdmin.set(role === 'Admin'); // Set admin status
  }

  logoutUser() {
    localforage.removeItem('cookie');
    localforage.removeItem('role');
    this.userLogged.set(false); // Set user as logged out
    this.isAdmin.set(false); // Remove admin status
  }
}

// to acchieve the updatation of header items whent he user logs in nad logs out/
// this service was created when the user logs in the login button is remved by amdin poratl button
// earlier it was not working, it only happend when we used to hard refresh the Browser
// now we created the signals which isnot notifuin the respected modules to update the value nad the header ɵEmptyOutletComponentin the header
// html we are directuly assessign the value of the signasl insayed of the balue defiend in header.html
