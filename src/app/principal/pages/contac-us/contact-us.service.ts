import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { inject, Signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



export function useSendEmailMutation() {
  const envs = environment;
  const http = inject(HttpClient);
  const headers = new HttpHeaders({ "Content-Type": `application/json` });
  return injectMutation(() => ({
    mutationFn: (params: any) =>
      lastValueFrom(
        http.post(`${envs.backend}/email/send`, params, {
          headers,
        }).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        )
      ),
  }));
}
