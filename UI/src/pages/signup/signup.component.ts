import { Component, ViewChild } from '@angular/core';
import { LayoutLoginComponent } from '../../components/layout-login/layout-login.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, NgModel, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; 
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, LayoutLoginComponent, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;
  formSubmitted = false;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService) {}

  ngAfterViewInit() {
    this.signupForm.control.setValidators(this.passwordMatchValidator);
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };

  submit() {
    this.formSubmitted = true;

    if (this.signupForm.valid && !this.signupForm.hasError('passwordMismatch')) {
      const nome = this.signupForm.value['nome'];
      const email = this.signupForm.value['email'];
      const password = this.signupForm.value['password'];

      this.loginService
      .signup(nome, email, password)
      .subscribe({
        next: () => {
          this.router.navigate(["login"]);
          this.toastService.success('Cadastro com sucesso!');
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
    this.router.navigate(["login"]);
  }

  private markFormControlsAsTouched() {
    Object.keys(this.signupForm.controls).forEach(key => {
      this.signupForm.controls[key].markAsTouched();
    });
  }
}
