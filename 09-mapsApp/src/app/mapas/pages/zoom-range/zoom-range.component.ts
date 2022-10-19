import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';   // npm i --save-dev @types/mapbox-gl


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }
    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left:50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width:400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Tomar elemento HTML y utilizarlo como propiedad
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  centroMapa : [number, number] = [ -99.1796307030495 ,19.5339028907848];  //Longitud , Latitud


  constructor() { }

  ngOnDestroy(): void {
      //Hay que eliminar los listener
      this.mapa.off('zoom', ()=>{});
      this.mapa.off('zoomend', ()=>{});
      this.mapa.off('move', ()=>{});

  }

  //Despues que se ha construido e inicializado el Obj
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centroMapa,
      zoom: this.zoomLevel
    });

    //listener para saber cuando cambia el valor del zoom
    this.mapa.on('zoom',  (evento)=>{
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    });

    //listener para saber cuando termine de hacer el zoom
    this.mapa.on('zoomend',  (evento)=>{
      if (this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo(18);
      }
    });

    //Listener para obtener el movimiento del mapa (latitud, longitud) y setear centro del mapa
    this.mapa.on('move', (evento)=>{
      const target = evento.target;
      const {lng, lat} =    target.getCenter();  // Destructuring
      this.centroMapa = [lng, lat];
    })

  }

  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
  }

}
