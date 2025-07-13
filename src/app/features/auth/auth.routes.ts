import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authGuard } from './auth.guard';
import { authSuccessGuard } from './pages/auth-success/auth-success.guard';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/signup/signup.component').then(
            (m) => m.SignupComponent,
          ),
      },
      {
        path: 'auth-success',
        loadComponent: () =>
          import('./pages/auth-success/auth-success.component').then(
            (m) => m.AuthSuccessComponent,
          ),
        canActivate: [authSuccessGuard],
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
