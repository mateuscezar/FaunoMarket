import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductComponent } from '../../components/product/product.component';
import { ProductStateService } from '../../store/product-state-service';
import { CategoryStateService } from '../../store/category-state-service';
import { CategoryComponent } from '../../components/category/category.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ProductComponent,
    CategoryComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = 'Produto';

  constructor() {}

  private productStateService = inject(ProductStateService);
  private categoryStateService = inject(CategoryStateService);

  ngOnInit(): void {
    this.categoryStateService.loadCategory();
    this.productStateService.loadProducts();
  }

}
