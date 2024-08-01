import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../../types/home.types';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    private toastService: ToastrService
  ) {}

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

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) =>
        this.toastService.error(
          error.message ?? 'Erro inesperado! Tente novamente mais tarde'
        ),
    });
  }
}
