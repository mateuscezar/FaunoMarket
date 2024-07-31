import { Component, ViewChild } from '@angular/core';
import { LayoutLoginComponent } from '../../components/layout-login/layout-login.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LayoutLoginComponent, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private router: Router) { }

  navigate() {
    if (this.loginForm) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log('Email:', email);
      console.log('Password:', password);
      this.router.navigate(["signup"]);
    }
  }
}
