import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent {
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(user: string, password: string) {
    this.mensajeError = '';
    if (this.authService.login(user, password)) {
      this.router.navigate(['/home']);
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';
    }
  }
}