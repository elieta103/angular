import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [],
})
export class NoComunesComponent {
  // i18nSelect
  nombre: string = 'Juana';
  genero: string = 'femenino';
  invitacionMapa = {
    masculino: 'invitarlo',
    femenino: 'invitarla',
  };

  // i18nPlural
  clientes: string[] = ['Ian', 'Maria', 'Jorge', 'Luis'];
  clientesMapa = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    other: 'tenemos # clientes esperando.',
  };

  cambiarPersona() {
    if (this.nombre === 'Juana' && this.genero === 'femenino') {
      this.nombre = 'Eliel';
      this.genero = 'masculino';
    } else {
      this.nombre = 'Juana';
      this.genero = 'femenino';
    }
  }

  borrarCliente() {
    this.clientes.shift();
  }

  // Key Value Pipe
  persona = {
    nombre: 'Eliel',
    edad: 35,
    direccion: 'Guanajuato 198',
  };

  // JSON Pipe
  heroes = [
    {
      nombre: 'Superman',
      vuela: true,
    },
    {
      nombre: 'Robin',
      vuela: false,
    },
    {
      nombre: 'Aquaman',
      vuela: false,
    },
  ];

  //Async Pipe
  miObservable = interval(5000); //Observable que emite valores numericos: 0,1,2,...

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos datos de la promesa');
    }, 5000);
  });
}
