import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { ActionResponse, LoginResponse } from '../../types/login-response.types';
import { ToastrService } from 'ngx-toastr';
import { ProductFilter } from '../../types/home.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private toastService: ToastrService) { }

  getCategories() {
    return this.httpClient.get<ActionResponse>("/productcategory").pipe(
      map(value => {
        if (!value.success) {
          throw new Error(value.message || 'Erro desconhecido');
        }
        return value.data;
      }),
      catchError(error => {
        return throwError(() => new Error(!!error?.error?.Message ? error?.error?.Message : (!!error.message ? error.message : 'Erro desconhecido')));
      })
    );
  }

  getProducts(filter: ProductFilter) {
    return this.httpClient.post<ActionResponse>("/product/filter", filter).pipe(
      map(value => {
        if (!value.success) {
          throw new Error(value.message || 'Erro desconhecido');
        }
        return value.data;
      }),
      catchError(error => {
        return throwError(() => new Error(!!error?.error?.Message ? error?.error?.Message : (!!error.message ? error.message : 'Erro desconhecido')));
      })
    );
  }
  
}
