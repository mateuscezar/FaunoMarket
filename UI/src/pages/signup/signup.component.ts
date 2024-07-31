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
  selector: 'app-signup',
  standalone: true,
  imports: [LayoutLoginComponent, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(private router: Router) { }

  navigate(){
    const nome = this.signupForm.value.nome;
      const email = this.signupForm.value.email;
      console.log('nome:', nome);
      console.log('email:', email);
    this.router.navigate(["login"])
  }
}

