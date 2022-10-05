import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Heroe } from '../../interfaces/herores.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe({
      next: (resp) => {
        this.heroes = resp;
      },
      complete: () => {},
      error: () => {},
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    //Validar si es un string vacio
    if (!event.option.value) {
      console.log('No hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!).subscribe({
      next: (heroe) => {
        this.heroeSeleccionado = heroe;
      },
      complete: () => {},
      error: () => {},
    });
  }
}
