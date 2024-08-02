import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProductComponent } from '../../components/product/product.component';
import { CategoryComponent } from '../../components/category/category.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

import { ProductStateService } from '../../store/product-state-service';
import { CategoryStateService } from '../../store/category-state-service';
import { ProductService } from '../../services/product/product.service';

import { Product } from '../../types/home.types';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    CategoryComponent,
    HeaderComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = 'Produto';

  private dialog = inject(MatDialog);
  private toastService = inject(ToastrService);
  private productStateService = inject(ProductStateService);
  private categoryStateService = inject(CategoryStateService);
  private productService = inject(ProductService);
  
  protected products$ = this.productStateService.getProducts();

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.categoryStateService.loadCategory();
    this.productStateService.loadProducts();
  }

  onAdd(): void {
    this.openDialogForCreate();
  }

  private openDialogForCreate(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        product: { name: '', description: '', price: 0, stockQuantity: 0 },
        title: 'Cadastrar Produto',
        submitFn: this.onCreateSubmit.bind(this),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productStateService.loadProducts();
      }
    });
  }

  private onCreateSubmit(product: Product): void {
    this.productService.create(product).pipe(take(1)).subscribe(result => {
      if (result) {
        this.toastService.success('Produto cadastrado com sucesso!');
      }
    });
  }
}
