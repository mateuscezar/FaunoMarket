import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductStateService } from '../../store/product-state-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name: string = 'aproveite';
  searchControl = new FormControl();

  constructor(private router: Router) {}

  private productStateService = inject(ProductStateService);

  ngOnInit(): void {
    const authName = sessionStorage.getItem('auth-name');
    if (authName !== null) {
      this.name = authName;
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((results) => {
      this.productStateService.filterName(results)
    });
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-name');
    sessionStorage.removeItem('auth-email');
    this.router.navigate(['login']);
  }
}
