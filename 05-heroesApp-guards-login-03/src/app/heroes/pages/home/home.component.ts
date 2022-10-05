import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  //Para pintar al usuario logeado
  get auth() {
    return this.authService.auth;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    // Ir backend y Obtener un Usuario, se requiere un servicio. Debe direccionar a la pantalla heroes

    this.router.navigate(['./auth']);
  }
}
