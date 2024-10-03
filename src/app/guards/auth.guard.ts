import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accesstoken = localStorage.getItem('userSessionToken');
  if (accesstoken) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
