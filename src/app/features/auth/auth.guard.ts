import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '@core/constants';
import { AuthService } from '@shared/services/api/auth/auth.service';
import { CookieService } from '@shared/services/util/cookie.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);

  const authCookie = cookieService.get(Token.Auth);

  console.log('AUTH GUARD', authCookie);

  if (!authCookie) {
    return true;
  }

  return authService.me().pipe(
    map((user) => {
      //  if (user.status !== Status.ACTIVE)
      //  if (!response.permissions?.length)
      router.navigate(['portal']);
      return false;
    }),
    catchError(() => {
      return of(true);
    }),
  );

  return true;
};
