import { Component, inject } from '@angular/core';
import { CategoryStateService } from '../../store/category-state-service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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

  private categoryStateService = inject(CategoryStateService);
  protected categories$ = this.categoryStateService.getCategory();

}
