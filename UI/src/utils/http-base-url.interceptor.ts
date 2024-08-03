import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingStateService } from '../store/loading-state-service';
import { environment } from '../config/environment';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  private readonly baseUrl = environment.apiUrl;

  constructor(private loadingStateService: LoadingStateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingStateService.show();
    const apiReq = this.addBaseUrl(req);
    const authReq = this.addAuthorizationHeader(apiReq);

    return next.handle(authReq).pipe(
      finalize(() => this.loadingStateService.hide())
    );
  }

  private addBaseUrl(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({ url: `${this.baseUrl}${req.url}` });
  }

  private addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      return req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return req;
  }
}
