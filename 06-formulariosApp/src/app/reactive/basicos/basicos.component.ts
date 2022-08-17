import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  //OPCION 1
  /*miFormulario: FormGroup = new FormGroup({
    producto: new FormControl('RTX 4080ti'),
    precio: new FormControl(1500),
    existencias: new FormControl(5),
  });*/

  //OPCION 2
  miFormulario: FormGroup = this.fb.group({
    producto: [null, [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      producto: 'RTX 4080ti',
      precio: 1600,
      existencias: 10,
    });
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); //Poner todos los campos como tocados
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
