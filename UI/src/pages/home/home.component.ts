import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductService } from '../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Category } from '../../types/home.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  value = 'Produto';
  categories: Category[] = [];

  constructor(private productService: ProductService, private toastService: ToastrService) { } 
  
  ngOnInit(): void {
    this.productService
        .getCategories()
        .subscribe({
          next: (data) => {
            this.categories = data;
          },
          error: (error) =>
            this.toastService.error(
              error.message ?? 'Erro inesperado! Tente novamente mais tarde'
            ),
        });
  }

}
