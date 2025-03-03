import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'portal',
    loadComponent: () =>
      import('./features/portal/portal.component').then(
        (c) => c.PortalComponent,
      ),
  },
  {
    path: 'admin-portal',
    loadComponent: () =>
      import('./features/admin-portal/admin-portal.component').then(
        (c) => c.AdminPortalComponent,
      ),
  },
];
