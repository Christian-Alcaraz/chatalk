import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '@core/constants';
import { AuthService } from '@shared/services/api/auth/auth.service';
import { CookieService } from '@shared/services/util/cookie.service';
import { catchError, map, of } from 'rxjs';

export const authSuccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);

  const authCookie = cookieService.get(Token.Auth);

  if (!authCookie) {
    router.navigate(['auth', 'login']);
    return false;
  }

  return authService.me().pipe(
    map((user) => {
      //Store this
      // if (user.status !== Status.ACTIVE) {
      //     snackbar.openErrorSnackbar(
      //       `Access Denied`,
      //       `Your account is not active. Please contact your Administrator.`,
      //       { duration: 3000 },
      //     );
      //     return forceLogoutUser();
      //   }

      //   //Bypass guard if userType === 'Admin'
      //   if (user.userType === UserType.ADMIN) {
      //     return true;
      //   }

      //   if (!user.permissions?.length) {
      //     snackbar.openErrorSnackbar(
      //       `Access Denied`,
      //       `You do not have any permissions granted for access. Please contact your Administrator.`,
      //       { duration: 3000 },
      //     );
      //     return forceLogoutUser();
      //   }
      router.navigate(['portal']);
      return true;
    }),
    catchError(() => {
      router.navigate(['auth', 'login']);
      return of(false);
    }),
  );
};
