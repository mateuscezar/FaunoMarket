import { Component, inject, ViewChild } from '@angular/core';
import { LayoutLoginComponent } from '../../components/layout-login/layout-login.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { ProductStateService } from '../../store/product-state-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LayoutLoginComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  formSubmitted = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  private productStateService = inject(ProductStateService);

  submit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];

      this.loginService
        .login(email, password)
        .subscribe({
          next: () => {
            this.productStateService.clearFilter();
            this.router.navigate(['home'])
          },
          error: (error) =>
            this.toastService.error(
              error.message ?? 'Erro inesperado! Tente novamente mais tarde'
            ),
        });

    } else {
      this.toastService.error('Preencha seus dados corretamente.');
      this.markFormControlsAsTouched();
    }
  }

  navigate() {
    if (this.loginForm) {
      this.router.navigate(['signup']);
    }
  }

  private markFormControlsAsTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.controls[key].markAsTouched();
    });
  }
}
