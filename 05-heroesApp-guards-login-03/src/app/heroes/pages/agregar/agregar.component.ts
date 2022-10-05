import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/herores.interface';
import { HeroesService } from '../../services/heroes.service';
import { of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvels Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Edicion
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
        .subscribe({
          next: (heroe) => {
            this.heroe = heroe;
          },
          complete: () => {},
          error: () => {},
        });
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //Actualizar
      console.log(`Actualizando...  ${this.heroe.superhero}`);
      this.heroesService.actualizarHeroe(this.heroe).subscribe({
        next: (resp) => {
          this.heroe = resp;
          this.mostrarSnackBar('Registro actualizado.');
        },
        complete: () => {},
        error: () => {},
      });
    } else {
      //Nuevo
      console.log(`Agregando...  ${this.heroe.superhero}`);
      this.heroesService.agregarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.heroe = heroe;
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Registro guardado.');
        },
        complete: () => {},
        error: () => {},
      });
    }
  }

  borrar() {
    console.log(`Borrando... `);
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.heroe }, //{...} Una copia del objeto
    });

    //OPCION 1
    // Subscribe que devuelve un subscribe, se utiliza el .pipe y switchMap
    dialog
      .afterClosed()
      .pipe(
        switchMap(
          (respDialog) =>
            respDialog
              ? this.heroesService.borrarHeroe(this.heroe.id!) // Devuelve un Observable<Heroe>
              : of(false) //Devuelve un Observable<Boolean>
        )
      )
      .subscribe({
        next: (heroe) => {
          this.router.navigate(['/heroes']);
        },
        complete: () => {},
        error: () => {},
      });

    //OPCION 2
    /*dialog.afterClosed().subscribe((respDialog) => {
      if (respDialog) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe({
          next: (heroe) => {
            this.router.navigate(['/heroes']);
          },
          complete: () => {},
          error: () => {},
        });
      }
    });*/
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
