import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import localforage from 'localforage';

export const adminGuard: CanActivateFn = async (route, state) => {
    const router=inject(Router);
  const role = await localforage.getItem('role');
  if (role === 'Admin') {
    return true;
  } else {
    alert("only admin can acces this link")
    router.navigateByUrl('/home');
    return false;
  }
};
