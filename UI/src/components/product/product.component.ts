import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Product } from '../../types/home.types';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductStateService } from '../../store/product-state-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product',
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
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  products: Product[] = [];

  constructor(public dialog: MatDialog, private toastService: ToastrService) {}

  private productStateService = inject(ProductStateService);
  protected products$ = this.productStateService.getProducts();
  private productService = inject(ProductService);

  openConfirmationDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productStateService.deleteProduct(productId);
  }

  openDialogForEdit(product: Product) {
    this.dialog
      .open(ProductDialogComponent, {
        data: {
          product: product,
          title: 'Editar Produto',
          submitFn: (updatedProduct: Product) =>
            this.onEditSubmit(updatedProduct),
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.productStateService.loadProducts();
      });
  }

  onEditSubmit(product: Product) {
    this.productService
      .update(product)
      .pipe(take(1))
      .subscribe((result) => {
        if (result)
          this.toastService.success('Produto atualizado com sucesso!');
      });
  }
}
