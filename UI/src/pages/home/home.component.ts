import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductService } from '../../services/product/product.service';
import { Category, Product } from '../../types/home.types';
import { ProductComponent } from '../../components/product/product.component';
import { ProductStateService } from '../../store/product-state-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    ToastrModule,
    ProductComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = 'Produto';
  categories: Category[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastService: ToastrService,
  ) {}

  private productStateService = inject(ProductStateService);

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) =>
        this.toastService.error(
          error.message ?? 'Erro inesperado! Tente novamente mais tarde'
        ),
    });

    this.productStateService.loadProducts();
    
  }

  
}
