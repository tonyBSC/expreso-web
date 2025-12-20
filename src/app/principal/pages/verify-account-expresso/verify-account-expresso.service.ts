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

export function useVericatioAccount(token: string) {
	const envs = environment;
	const http = inject(HttpClient);
    console.log("token:" ,token)

	return injectQuery(() => ({
        queryKey: ["Verify", token],
		queryFn: () =>
			lastValueFrom(
				http.get<Response>(`${envs.backend}/api/v1/auth/verify?token=${token}`, ).pipe(
				// http.get<Response>(`/api/v1/auth/verify?token=${token}`, ).pipe(
					catchError((error: HttpErrorResponse) => {
						return throwError(() => error);
					})
				)
			),
	}));
}
