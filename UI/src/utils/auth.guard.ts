import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem('auth-token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000;

        if (Date.now() < exp) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
