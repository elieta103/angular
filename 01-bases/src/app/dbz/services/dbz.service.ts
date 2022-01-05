import { Injectable } from "@angular/core";
import { Personaje } from '../interfaces/dbz.interfaces';


@Injectable()
export class DbzService{

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
    
    get personajes(): Personaje[]{
        return [...this._personajes];
    }

    constructor(){}

    agregarPersonajes(personaje: Personaje){
        this._personajes.push(personaje);
    }

}