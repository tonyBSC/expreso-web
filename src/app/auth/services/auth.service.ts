import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export function useLoginMutation() {
  const envs = environment;
  const http = inject(HttpClient);
  const queryClient = inject(QueryClient);
  
  const headers = new HttpHeaders({ "Content-Type": `application/json` });


  return injectMutation(() => ({
    mutationFn: (params: {username: String, password: String}) =>
      lastValueFrom(
        http.post(`${envs.backend}/auth/login`, params, {
          headers,
          withCredentials: true,
        }).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        )
      ),
  }));
}

export function useRegisterUserMutation() {
  const envs = environment;
  const http = inject(HttpClient);
  const queryClient = inject(QueryClient);
  
  const headers = new HttpHeaders({ "Content-Type": `application/json` });

  return injectMutation(() => ({
    mutationFn: (params: {username: String, password: String}) =>
      lastValueFrom(http.post(`${envs.backend}/auth/register`, params, { headers: headers})),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
  }));
}

export function useIsAuthQuery() {
  const http = inject(HttpClient);
  return injectQuery(() => ({
    queryKey: [],
    staleTime: 86400,
    queryFn: () => lastValueFrom(http.get('/auth/is_auth')),
  }));
}