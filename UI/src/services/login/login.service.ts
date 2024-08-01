import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { ActionResponse, LoginResponse } from '../../types/login-response.types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private toastService: ToastrService) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("/auth/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      }),
      catchError(error => {
        return throwError(() => new Error(error?.error?.Message || 'Erro desconhecido'));
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<ActionResponse>("/user", { name, email, password }).pipe(
      map(value => {
        if (!value.success) {
          throw new Error(value.message || 'Erro desconhecido');
        }
        return value.message;
      }),
      catchError(error => {
        return throwError(() => new Error(!!error?.error?.Message ? error?.error?.Message : (!!error.message ? error.message : 'Erro desconhecido')));
      })
    );
  }
}
