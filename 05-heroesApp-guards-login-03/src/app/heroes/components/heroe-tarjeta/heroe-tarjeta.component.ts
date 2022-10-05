import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/herores.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      img {
        height: auto;
        width: auto;
        max-width: 300px;
        max-height: 300px;
      }
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe; //Siempre va tener un valor

  constructor() {}
}
