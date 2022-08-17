import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //this.miFormulario.setValue(this.persona); //Solo se puede si ambos tienen genero y notificaciones
    this.miFormulario.reset({
      //Sino usar reset
      ...this.persona,
      condiciones: true,
    });

    //OPCION 1. Subscribirse a los cambios del formulario
    /*this.miFormulario.valueChanges.subscribe((form) => {
      delete form.condiciones;
      this.persona = form;
    });*/

    //OPCION 2. Subscribirse a los cambios del formulario, destructuring y rest operator
    this.miFormulario.valueChanges.subscribe(
      ({ condiciones, ...restoDeArgumentos }) => {
        this.persona = restoDeArgumentos;
      }
    );

    //Subscribirse al cambio de un valor del formulario
    /*this.miFormulario
      .get('condiciones')
      ?.valueChanges.subscribe((newValue) => console.log(newValue));*/
  }

  guardar() {
    const formValue = { ...this.miFormulario.value }; //Spread op,  Obtiene una copia del valor del form
    delete formValue.condiciones;

    this.persona = formValue;
    console.log(formValue);
  }
}
