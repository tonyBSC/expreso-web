import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export const authGuard: CanActivateFn = async(route, state) => {
  const envs = environment;
  const http = inject(HttpClient);
  const router = inject(Router);

  if (!router.navigated) {
    try {
      await firstValueFrom(http.get(`${envs.backend}/auth/is_auth`, { withCredentials: true }));
      return true;
    } catch {
      return router.createUrlTree(['/login']);
    }
  } else {
    return true;
  }
};
