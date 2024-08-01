import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:5000';
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });

    const token = sessionStorage.getItem('auth-token');
    if (token) {
    const authReq = req.clone({
            url: `${this.baseUrl}${req.url}`,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(authReq);
    }

    return next.handle(apiReq);
  }
}