import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingStateService } from '../store/loading-state-service';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:5000';

  constructor(private loadingStateService: LoadingStateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingStateService.show();

    const apiReq = req.clone({ url: `${this.baseUrl}${req.url}` });

    const token = sessionStorage.getItem('auth-token');
    const authReq = token ? apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : apiReq;

    return next.handle(authReq).pipe(
      finalize(() => {
        this.loadingStateService.hide();
      })
    );
  }
}
