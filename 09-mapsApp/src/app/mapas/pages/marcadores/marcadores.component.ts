import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';   // npm i --save-dev @types/mapbox-gl



interface MarcadorColor{
  marcador?: mapboxgl.Marker,
  color: string,
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .list-group{
      position:fixed;
      top : 20px;
      right : 20px;
      z-index:99;
    }

    li{
      cursor:pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  //Tomar elemento HTML y utilizarlo como propiedad
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  centroMapa : [number, number] = [ -99.1796307030495 ,19.5339028907848];  //Longitud , Latitud

  //Arreglo de marcadores
  marcadores : MarcadorColor[] = [];

  constructor() { }



  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centroMapa,
      zoom: this.zoomLevel
    });

    //Ejemplo de Marcador con la palabra Hola
    /*const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola';
    new mapboxgl.Marker({
      element: markerHtml
    }).setLngLat(this.centroMapa)
    .addTo(this.mapa);*/

  //Leyendo Marcadores guardados
  this.leerLocalStorage();

  }

  irMarcador(marcador : mapboxgl.Marker){
    this.mapa.flyTo({
      center: [marcador.getLngLat().lng,  marcador.getLngLat().lat]
    })
  }

  agregarMarcador(){
    //Genera Color Aleatorio
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

   const nuevoMarcador = new mapboxgl.Marker({
    draggable: true,
    color : color // Es igual a color: color aunque es redundante
   });
   nuevoMarcador.setLngLat(this.centroMapa);
   nuevoMarcador.addTo(this.mapa);

    //Objeto  de tipo interfaz para mantener el color
    const marcadorColor : MarcadorColor ={
      marcador: nuevoMarcador,
      color: color   // Es igual a color: color aunque es redundante
    }


    //listener dragend event as it fires after a marker has been dragged.
    //Evento esta disponible en los marcadores creados con Agregar,   agregarMarcador()
    //Tambien se debe poner en los recuperados de localstorage , leerLocalStorage()
    nuevoMarcador.on('dragend',  (evento: any)=>{
      console.log('Moviendo marcador btnAgregar: '+ evento.target._color);
      console.log("Lat "+evento!.target._lngLat.lat);
      console.log("Long " +evento!.target._lngLat.lng);
      this.guardarMarcadoresLocalStorage();
    });


    this.marcadores.push(marcadorColor);

    //Cada vez que agrega un marcador se actualiza el LocalStorage
    this.guardarMarcadoresLocalStorage();

  }


guardarMarcadoresLocalStorage(){

  const lngLatArr: MarcadorColor[] = [];

  this.marcadores.forEach( m => {
    const color = m.color;
    const {lng, lat} = m.marcador!.getLngLat();  // Destructuring
    lngLatArr.push({
      color: color,
      centro: [lng, lat],
      //marcador: new mapboxgl.Marker()   //No utilizada, es opcional
    });
  });
  localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

}

leerLocalStorage(){
  console.log('Leyendo del localStorage');
    if(! localStorage.getItem('marcadores')){
      return;
    }

  const lgnLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

  lgnLatArr.forEach(item => {
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: item.color
     });
     nuevoMarcador.setLngLat(item.centro!);
     nuevoMarcador.addTo(this.mapa);


    //listener dragend event as it fires after a marker has been dragged.
    //Evento esta disponible en los marcadores creados con Agregar,   agregarMarcador()
    //Tambien se debe poner en los recuperados de localstorage , leerLocalStorage()
    nuevoMarcador.on('dragend',  (evento: any)=>{
      console.log('Moviendo marcador LocalStorage: '+ evento.target._color);
      console.log("Lat "+evento!.target._lngLat.lat);
      console.log("Long " +evento!.target._lngLat.lng);
      this.guardarMarcadoresLocalStorage();
    });


      //Reconstruye Arreglo de marcadores
      this.marcadores.push({
        marcador: nuevoMarcador,
        color: item.color
      });
  });

}


borrarMarcador(i : number){
  console.log("Borrar item : "+i);
  this.marcadores[i].marcador?.remove();  //Remueve visualmente del mapa el marker
  this.marcadores.splice(i, 1);   // Remueve del arreglo
  this.guardarMarcadoresLocalStorage();  //Actualiza del localstorage
}

}
