import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:5000';
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });
    console.log('Intercepted request URL:', apiReq.url); // Adicione logs para depuração
    return next.handle(apiReq);
  }
}