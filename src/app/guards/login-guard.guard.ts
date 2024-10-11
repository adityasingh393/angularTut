import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import localforage from 'localforage';

export const loginGuardGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const cookie = await localforage.getItem('cookie');
  if (cookie) {
    router.navigateByUrl('/home');
    return false;
  } else {
    return true;
  }
};
