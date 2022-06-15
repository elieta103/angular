import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Va al HTML, busca un elemento que tenga un referencia local 'txtBuscar'
  // Non-null assertion Operator
  // ! Es el operador not Null, decir que nunca sera null
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){
  }

 buscar(){
   // Tambien funciona, borra contenido de caja despues del enter
   //document.querySelector('input').value='';
   const valor =  this.txtBuscar.nativeElement.value;
   if(valor.trim().length===0)
     return;
   
   this.gifsService.buscarGifs( valor );
   this.txtBuscar.nativeElement.value ='';
 }

}
