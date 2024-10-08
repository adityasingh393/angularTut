import { CanActivateFn } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const sessionToken=localStorage.getItem("userSessionToken");
 if(sessionToken){
     console.log(route ,"login gaurd");
  return false;
 }
 else{
  return true;
 }
};
