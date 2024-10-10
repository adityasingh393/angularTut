import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginGuardGuard } from './guards/login-guard.guard';
import { EditUserDetailsComponent } from './pages/edit-user-details/edit-user-details.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { adminGuard } from './guards/admin.guard';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuardGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuardGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-user-details/:id',
    component: EditUserDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'upload-image',
    component: FileUploadComponent,
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
