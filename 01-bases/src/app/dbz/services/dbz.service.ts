import { Injectable } from "@angular/core";
import { Personaje } from '../interfaces/dbz.interfaces';


@Injectable()
export class DbzService{

    // _personajes indica que es un propiedad privada, solo es una convencion
    private _personajes: Personaje[] = [
        {
          nombre: 'Goku',
          poder: 5000
        },
        {
          nombre: 'Vegeta',
          poder: 8000
        }
      ];
    
      //Separa cada uno de los elementos del array y crea uno nuevo
    get personajes(): Personaje[]{
        return [...this._personajes];
    }

    constructor(){}

    agregarPersonajes(personaje: Personaje){
        this._personajes.push(personaje);
    }

}