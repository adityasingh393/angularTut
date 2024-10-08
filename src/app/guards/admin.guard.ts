import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
 const user=JSON.parse( localStorage.getItem('userDetails')||'{}');
 console.log(user ,"from amdin gaurd")
 if((user?.role)==='Admin'){
  return true;
 }
 else{
  return false;
 }
};
