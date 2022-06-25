import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent {
  nombreLower: string = 'ElIeL hErReRA gREsS';
  nombreUpper: string = 'ElIeL hErReRA gREsS';
  nombreCompleto: string = 'ElIeL hErReRA gREsS';

  fecha: Date = new Date();
}
