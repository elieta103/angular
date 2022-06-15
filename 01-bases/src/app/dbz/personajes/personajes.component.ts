import { Component } from '@angular/core';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent{

  //Crea y devuelve personajes: Personaje[]
  get personajes(){
    return this.dbzService.personajes;
  }
  
  constructor(private dbzService: DbzService){}
  
}
