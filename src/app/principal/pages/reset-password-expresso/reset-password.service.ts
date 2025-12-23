import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { inject, Signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Response{
    success: boolean,
    title: string,
    message: string
}

export function useResetPasswordMutation(token: string) {
	const envs = environment;
	const http = inject(HttpClient);
	const headers = new HttpHeaders({
		'Authorization': `${token}`,
		'Content-Type': 'application/json',
	});

	return injectMutation(() => ({
    mutationFn: async (params: { password: string }) => {
      return lastValueFrom(
        http
          .post<Response>(`${envs.backend}/api/v1/auth/reset-password`, params, { headers })
          .pipe(
            catchError((error: HttpErrorResponse) => throwError(() => error))
          )
      );
    },
  }));
}
