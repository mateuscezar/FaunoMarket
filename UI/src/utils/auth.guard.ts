import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly loginUrl = '/login';

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem('auth-token');

    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      this.navigateToLogin();
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  private navigateToLogin(): void {
    this.router.navigate([this.loginUrl]);
  }
}
