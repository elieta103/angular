import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // Ir backend y Obtener un Usuario, se requiere un servicio. Debe direccionar a la pantalla heroes
    this.authService.login().subscribe({
      next: (resp) => {
        if (resp.id) {
          console.log(resp);
          this.router.navigate(['./heroes']);
        }
      },
      complete: () => {},
      error: () => {},
    });
  }
}
