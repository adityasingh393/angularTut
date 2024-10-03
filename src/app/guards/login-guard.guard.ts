import { CanActivateFn } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const sessionToken=localStorage.getItem("userSessionToken");
 if(sessionToken){
  return false;
 }
 else{
  return true;
 }
};
