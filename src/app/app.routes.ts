import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
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
