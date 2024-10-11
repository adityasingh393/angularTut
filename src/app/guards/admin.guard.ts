import { CanActivateFn } from '@angular/router';
import localforage from 'localforage';

export const adminGuard: CanActivateFn = async (route, state) => {
const role= await localforage.getItem("role");
 if(role==='Admin'){
  return true;
 }
 else{
  return false;
 }
};
