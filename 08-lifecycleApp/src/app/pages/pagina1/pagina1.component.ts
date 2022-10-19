import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html'
})
export class Pagina1Component implements OnInit, OnChanges, DoCheck,
AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  nombre: string = 'Eliel';
  segundos: number = 0;
  timerSubscription !: Subscription;


  // Cuando se crea una nueva instancia del componente
  constructor() {
    console.log('constructor...  Cuando se crea una nueva instancia del componente');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges... ');
  }
  //Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton
  ngDoCheck(): void {
    console.log('ngDoCheck... Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton. ANTES DE CAMBIOS');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  // Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked... Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  // Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked... Cuando angular tiene que validar, que debe de volver a renderizar, lo que haya cambiado. Click del boton CAMBIOS YA HECHOS VERIFICA');
  }

  // Al ocultar el componente se destruye completamente
  ngOnDestroy(): void {
    console.log('ngOnDestroy...');
    this.timerSubscription.unsubscribe();
  }

  // Despues que se ha creado la instancia del componente
  ngOnInit(): void {
    console.log('ngOninit... Despues que se ha creado la instancia del componente');
    this.timerSubscription = interval(1000).subscribe(i =>{
      this.segundos = i;
    })


  }

  guardar(){

  }
}
