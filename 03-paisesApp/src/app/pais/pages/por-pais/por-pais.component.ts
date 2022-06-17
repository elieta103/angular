import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    //ocultar sugerencias
    this.mostrarSugerencias = false;

    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log(paises);
        this.paises = paises;
      },
      error: (err) => {
        console.log(err);
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    //Muestra las sugerencias
    this.mostrarSugerencias = true;

    console.log('sugerencias : ', termino);

    this.paisService.buscarPais(termino).subscribe(
      (paisSugerido) => {
        this.paisesSugeridos = paisSugerido.splice(0, 5);
      },
      (error) => {
        this.paisesSugeridos = [];
      }
    );
  }

  buscarSugerido(terminoSugerido: string) {
    console.log('buscarSugerido ', terminoSugerido);

    this.buscar(terminoSugerido);
  }
}