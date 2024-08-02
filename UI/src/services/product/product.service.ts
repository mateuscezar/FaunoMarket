import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActionResponse } from '../../types/login-response.types';
import { Product, ProductFilter } from '../../types/home.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BASE_URL = '/product';

  constructor(private httpClient: HttpClient, private toastService: ToastrService) { }

  getCategories() {
    return this.httpClient.get<ActionResponse>("/productcategory").pipe(
      map(this.handleResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  getProducts(filter: ProductFilter) {
    return this.httpClient.post<ActionResponse>(`${this.BASE_URL}/filter`, filter).pipe(
      map(this.handleResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  delete(productId: number) {
    return this.httpClient.delete<ActionResponse>(`${this.BASE_URL}/${productId}`).pipe(
      map(this.handleResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  update(product: Product) {
    return this.httpClient.put<ActionResponse>(this.BASE_URL, product).pipe(
      map(this.handleResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  create(product: Product) {
    return this.httpClient.post<ActionResponse>(this.BASE_URL, product).pipe(
      map(this.handleResponse.bind(this)),
      catchError(this.handleError.bind(this))
    );
  }

  private handleResponse(response: ActionResponse) {
    if (!response.success) {
      throw new Error(response.message || 'Erro desconhecido');
    }
    return response.data ?? response.success;
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.Message || error?.message || 'Erro desconhecido';
    this.toastService.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
