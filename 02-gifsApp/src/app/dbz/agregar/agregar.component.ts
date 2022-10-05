import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent {

  @Input() nuevo:Personaje={
    nombre : '',
    poder: 0
  }

  //@Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();
  // @Input()   recibe un componente del padre
  // @Output()  emite un valor al padre

  // () Emite o escucha eventos (click)
  // [] Establecer propiedades
  // [()] Two way data binding

  constructor(private dbzService: DbzService){}

  agregar(){
    //En html agregar($event), recibir el evento => event.preventDefault()
    //Con la directiva (ngSubmit), evita el refresh del navegador
    if(this.nuevo.nombre.trim().length ===0 ){
      return;
    }

    this.dbzService.agregarPersonajes(this.nuevo);
    
    // Una vez capturado el nuevo personaje se debe emitir al Padre
    //this.onNuevoPersonaje.emit(this.nuevo);

    this.nuevo ={
      nombre :'',
      poder : 0
    }
  }



}
