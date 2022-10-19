import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';   // npm i --save-dev @types/mapbox-gl


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa{
      width: 100%;
      height: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -99.1796307030495 ,19.5339028907848],  //Longitud , Latitud
      zoom: 16
    });

  }

}
