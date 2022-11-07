import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges {

  htmlElement: ElementRef<HTMLElement>;
  private _color : string = 'red';
  private _mensaje : string = 'Campo requerido.';


  //Se ejecuta solo si cambia el color
  @Input() set color (valor: string ){
    this._color = valor;
    this.setColor();
  }

  //Se ejecuta solo si cambia el mensaje
  @Input() set mensaje (valor: string){
    this._mensaje = valor;
    this.setMensaje();
  }

  //Se ejecuta solo si cambia el valido
  @Input() set valido (valor: boolean){
    // La class hidden se agrega en los styles globales
    if(valor){
      this.htmlElement.nativeElement.classList.add('hidden');
    }else{
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }



  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // OPCION 1, Se puede cambiar las props de manera dinamica con el OnChanges
    /*if(changes['mensaje']){
      this.htmlElement.nativeElement.innerText = changes['mensaje'].currentValue;
    }
    if(changes['color']){
      this.htmlElement.nativeElement.style.color = changes['color'].currentValue;
    }
    console.log(changes);*/
  }

  ngOnInit(): void {
    this.setColor();
    this.setMensaje();
    this.setClass();
  }

  setColor(): void{
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void{
    this.htmlElement.nativeElement.innerText= this._mensaje;
  }

  setClass(): void{
    this.htmlElement.nativeElement.classList.add('form-text');
  }

}
