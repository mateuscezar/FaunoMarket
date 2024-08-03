import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Product, ProductFilter } from '../types/home.types';
import { ProductService } from '../services/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private productService = inject(ProductService);
  private toastService = inject(ToastrService);
  private filter: ProductFilter = {
    name: '',
    categoryId: 0,
  }

  
  loadProducts() {
    this.productService.getProducts(this.filter).pipe(take(1)).subscribe(products => this.setProducts(products));
  }

  private setProducts(products: Product[]) {
    this.products$.next(products);
  }

  getProducts() {
    return this.products$.pipe();
  }

  filterName(name: string) {
    this.filter.name = name;
    this.loadProducts();
  }

  filterCategory(categoryId?: number) {
    this.filter.categoryId = categoryId;
    this.loadProducts();
  }

  clearFilter(){
    this.filter.name = '';
    this.filter.categoryId = 0;
  }

  addProduct(product: Product) {
    const currentProducts = this.products$.value;
    this.products$.next([...currentProducts, product]);
  }

  deleteProduct(productId: number) {
    this.productService.delete(productId).pipe(take(1)).subscribe((result) => {
        if(result){
            this.toastService.success('Produto excluído com sucesso!');
            this.loadProducts()
        }
    });
  }
}