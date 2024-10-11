import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import localforage from 'localforage';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const userSessionToken = await localforage.getItem('cookie');
  if (userSessionToken) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
