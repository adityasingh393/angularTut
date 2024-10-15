import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import localforage from 'localforage';

export const optVerificationGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const otpVerified = await localforage.getItem('otpVerificationStatus');

  if (otpVerified === 'done') {
    alert('email has already been verified procced to register');
    router.navigateByUrl('register');
    return false;
  } else {
    return true;  
  }
};
