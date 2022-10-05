import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/herores.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 7px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //switchMap recibe lo que el Observable de activatedRoute emite
    // Lo envia al del servicio

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe({
        next: (resp) => {
          this.heroe = resp;
        },
        complete: () => {},
        error: () => {},
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
