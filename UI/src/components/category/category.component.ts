import { Component, inject } from '@angular/core';
import { CategoryStateService } from '../../store/category-state-service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Category } from '../../types/home.types';
import { ProductStateService } from '../../store/product-state-service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  private productStateService = inject(ProductStateService);
  private categoryStateService = inject(CategoryStateService);
  protected categories$ = this.categoryStateService.getCategory();

  onClickCategory = (category: Category) => {
    if(category){
      this.categoryStateService.selectCategory(category);
      this.productStateService.filterCategory(category.selected ? 0 : category.id);
    }
  }

}
