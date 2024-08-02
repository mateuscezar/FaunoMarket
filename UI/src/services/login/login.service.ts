import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { ActionResponse, LoginResponse } from '../../types/login-response.types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly AUTH_URL = '/auth';
  private readonly USER_URL = '/user';

  constructor(private httpClient: HttpClient, private toastService: ToastrService) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.AUTH_URL}/login`, { email, password }).pipe(
      tap(this.handleLoginResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<ActionResponse>(this.USER_URL, { name, email, password }).pipe(
      map(this.handleActionResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  private handleLoginResponse(response: LoginResponse) {
    sessionStorage.setItem("auth-token", response.token);
    sessionStorage.setItem("auth-name", response.name);
    sessionStorage.setItem("auth-email", response.email);
  }

  private handleActionResponse(response: ActionResponse) {
    if (!response.success) {
      throw new Error(response.message || 'Erro desconhecido');
    }
    return response.message;
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.Message || error?.message || 'Erro desconhecido';
    return throwError(() => new Error(errorMessage));
  }
}
