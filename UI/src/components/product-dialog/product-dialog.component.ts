import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../types/home.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { CategoryStateService } from '../../store/category-state-service';

@Component({
  selector: 'app-product-dialog',
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
    MatSelectModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  title: string;
  submitFn: (product: Product) => void;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, title: string, submitFn: () => void }
  ) {
    this.title = data.title;
    this.submitFn = data.submitFn;
  }

  private categoryStateService = inject(CategoryStateService);
  protected categories$ = this.categoryStateService.getCategory();

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.data.product);
      this.submitFn(this.data.product); 
    } else {
      form.form.markAllAsTouched();
    }
  }

  formatAndValidatePrice(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(value)) {
      this.data.product.price = parseFloat(value) || 0;
      input.value = this.data.product.price.toFixed(2);;
    } else {
      input.value = this.data.product.price.toFixed(2);;
    }
  }
}
