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
    ToastrModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastService: ToastrService,
    public dialog: MatDialog
  ) {}

  private productStateService = inject(ProductStateService);
  protected products$ = this.productStateService.getProducts();

  openConfirmationDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: { product: { ...product } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(result);
      }
    });
  }

  deleteProduct(productId: number): void {
    console.log('deleteProduct', productId);
    // this.productService.deleteProduct(productId).subscribe({
    //   next: () => {
    //     this.products = this.products.filter(p => p.id !== productId);
    //     this.toastService.success('Produto excluído com sucesso');
    //   },
    //   error: (error) =>
    //     this.toastService.error(
    //       error.message ?? 'Erro ao excluir o produto'
    //     ),
    // });
  }

  updateProduct(updatedProduct: Product): void {
    console.log('updateProduct', updatedProduct);
    // this.productService.updateProduct(updatedProduct).subscribe({
    //   next: (product) => {
    //     const index = this.products.findIndex(p => p.id === product.id);
    //     if (index !== -1) {
    //       this.products[index] = product;
    //       this.toastService.success('Produto atualizado com sucesso');
    //     }
    //   },
    //   error: (error) =>
    //     this.toastService.error(
    //       error.message ?? 'Erro ao atualizar o produto'
    //     ),
    // });
  }

}
