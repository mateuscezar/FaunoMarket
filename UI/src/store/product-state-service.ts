import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Product } from '../types/home.types';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private productService = inject(ProductService);

  loadProducts() {
    this.productService.getProducts().pipe(take(1)).subscribe(products => this.setProducts(products));
  }

  private setProducts(products: Product[]) {
    this.products$.next(products);
  }

  getProducts() {
    return this.products$.pipe();
  }

  addProduct(product: Product) {
    const currentProducts = this.products$.value;
    this.products$.next([...currentProducts, product]);
  }
}