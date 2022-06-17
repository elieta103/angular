import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country, Translation } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  // Es como decirle a Typescript, pais puede ser null, pero tratalo como si tajera datos.
  pais!: Country;
  translations: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del URL  params = {id: "LO"}, destructuring => { id }
    /*  
    // OPCION 1
    this.activatedRoute.params.subscribe(({ id }) => {
      this.paisService.getPaisporId(id).subscribe((resp) => {
        console.log(resp);
      });
    });
    */
    // OPCION 2
    // switchMap() es que recibe el parámetro param de tipo Observable <Params>
    // y devuelve un observable <Country> que es el return de la función getPaisPorId(),
    // de modo que no es necesario aplicar dos veces el método .subscribe()
    // params = {id: "LO"}, destructuring => { id }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisporId(id)), //Recibe: Observable <Params> devuelve: Observable <Country>
        tap(console.log) //Recibe el Observable<Country> y lo imprime
      )
      .subscribe((pais) => {
        this.pais = pais[0];
        //array de traducciones
        for (const key in this.pais.translations) {
          this.translations.push(this.pais.translations[key].common);
        }
      });
  }
}
