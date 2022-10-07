import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms'
import { pipe, switchMap, tap } from 'rxjs';
import { PaisPorCodigo } from '../../interfaces/pais-codigo.interface';
import { Pais } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['',Validators.required],
    frontera: ['',Validators.required],
  });

  cargando: boolean = false;

  //Selector de regiones
  regiones : string[] = [];

  //Selector de paises
  paises : Pais[] = [];

  //Selector de fronteras
  fronteras : string[] = [];
  fronterasNombreCompleto: PaisPorCodigo[] = [];


  constructor(private fb: FormBuilder,
              private paisesServicio: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesServicio.regiones;

    //SwitchMap. Toma el valor producto de un observable, lo cambia y devuelve otro Observable
    // tap. Dispara un evento secundario

    //Cuando cambia la region  VERSION 1
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      //(_) () No lo voy a leer el item, Cuando cambia region, limpia pais
      tap((_) => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      }),
      // Recibe una region(continente), devuelve los paises del continente
      switchMap( region => this.paisesServicio.getPaisesPorRegion(region) )
      )
    .subscribe(paises =>{
      console.log('Paises : ', paises);
      this.paises = paises;
      this.cargando = false;

    });

    // Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      //(_) () No lo voy a leer el item, Cuando cambia pais, limpia fronteras
      tap( (_) => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      // Toma el codigo de pais ='USA', devuelve un array de borders [CAN,MEX]
      switchMap ( pais => this.paisesServicio.getFronterasPorPais(pais)),
    )
    .subscribe(fronterasPais => {
      if(fronterasPais!== null){
        if(fronterasPais.length>0){
          this.fronteras = fronterasPais[0].borders;
          console.log('Fronteras : '+ this.fronteras);
          //Toma el array de fronteras [CAN,MEX], devuelve [Canada, United State Mexicans]
          this.paisesServicio.getPaisesPorFronteras(this.fronteras).subscribe(resp=>{
            this.fronterasNombreCompleto = resp;
            this.cargando = false;
         });


        }
      }
    });

    //Cuando cambia la region  VERSION 2
    /*this.miFormulario.get('region')?.valueChanges.subscribe( reg => {
      console.log('Region seleccionada : ', reg);
      this.paisesServicio.getPaisesPorRegion(reg).subscribe (paises => {
        console.log(paises);
        this.paises = paises;
      })
    });*/
  }

  guardar(){
    console.log(this.miFormulario.value);
  }
}
