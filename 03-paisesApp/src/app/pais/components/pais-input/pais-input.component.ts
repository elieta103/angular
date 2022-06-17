import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  termino: string = '';

  //El componente de la caja de texto, emitira un evento(de tipo string con termino) al presionar Enter
  //Emite el valor capturado para que sea visto por el por-pais.component.ts
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  //Emitira un evento(de tipo string con termino) al presionar Enter, suscrito a un Observable, sugerencias
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // Mensaje del placeholder
  @Input() placeholder: string = '';

  // Es un Observable, la idea es que se emita cuando dejo de escribir
  debouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    // OnInit se ejecuta una sola vez, despues de crearse. Me suscribo a los valores que emite
    this.debouncer
      .pipe(
        debounceTime(300) //Cuantas milseg, esperar antes de emitir el sig. valor
      )
      .subscribe((valor) => {
        this.onDebounce.emit(valor); //valor=termino, Emite el onDebounce
        console.log('Debouncer : ', valor);
      });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    //llamar al debouncer y emitir un valor
    //se conecta con el debouncer, manda llamar al next, el next esta suscrito, lo recibe e imprime
    this.debouncer.next(this.termino);
  }
}
