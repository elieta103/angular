import { Component, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';   // npm i --save-dev @types/mapbox-gl


@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
    div{
      width: 100%;
      height: 150px;
      margin: 0px;
    }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lnglat : [number, number] = [0,0];

  //Referencia Local al Mapa
  @ViewChild('mapa') divMapa! : ElementRef;


  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lnglat,
      zoom: 15,
      interactive: false   //Posicion estaticas
    });

    //Crear un marcador
    new mapboxgl.Marker()
    .setLngLat(this.lnglat)
    .addTo(mapa);

  }

}
