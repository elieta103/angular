import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  //Recibir la referencia local del formulario, (!, Decirle a Typescript, confia en mi siempre va tener una valor)
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio: 0,
    existencias: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  guardar() {
    console.log(this.miFormulario);
    console.log('Posteo correcto.');
    this.miFormulario.resetForm({
      producto: '',
      precio: 0,
      existencias: 0,
    });
  }

  nombreValido(): boolean {
    // Para evitar el : TypeError: Cannot read...  se agrega this.miFormulario?
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched
    );
  }

  precioValido(): boolean {
    // Para evitar el : TypeError: Cannot read...  se agrega this.miFormulario?
    return (
      this.miFormulario?.controls['precio']?.value < 0 &&
      this.miFormulario?.controls['precio']?.touched
    );
  }
}
