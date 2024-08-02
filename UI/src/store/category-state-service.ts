import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Category } from '../types/home.types';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryStateService {
  private categories$ = new BehaviorSubject<Category[]>([]);
  private productService = inject(ProductService);

  loadCategory() {
    this.productService.getCategories().pipe(take(1)).subscribe(categories => this.setCategory(categories));
  }

  private setCategory(categories: Category[]) {
    this.categories$.next(categories);
  }

  selectCategory(selectedCategory: Category) {
    const updatedCategories = this.categories$.value.map(category => {
      if (category.id === selectedCategory.id) {
        return { ...category, selected: !category.selected };
      }
      return { ...category, selected: false };
    });
    this.categories$.next(updatedCategories);
  }

  getCategory() {
    return this.categories$.pipe();
  }

  addCategory(category: Category) {
    const currentcategories = this.categories$.value;
    this.categories$.next([...currentcategories, category]);
  }
}