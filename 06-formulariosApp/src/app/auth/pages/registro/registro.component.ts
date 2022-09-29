import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      //1. Valor inicial, 2. Validadores sincronos  3. Validaciones asíncronas
      nombre: [
        '', // Valor inicial
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ], // Validadores
      ],
      email: [
        '', // Valor inicial
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ], // Validadores
        [this.emailValidatorService], //Validaciones asincronas
      ],
      username: [
        '', // Valor inicial
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ], //Validadores
      pass: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required]],
    },
    {
      validators: [this.validatorService.camposIguales('pass', 'pass2')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Eliel Herrera',
      email: 'gresshel@gmail.com',
      username: 'gresshel',
      pass: '123456',
      pass2: '123456',
    });
  }

  campoNoValido(campo: string) {
    //? Es para que no truene cuando viene null/vacio
    const campoNoValid =
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched;

    //console.log(campo + ' campoNoValido ? ' + campoNoValid);

    return campoNoValid;
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'El correo es un dato requerido.';
    } else if (errors?.['pattern']) {
      return 'No tiene un formato de correo válido.';
    } else if (errors?.['emailTomado']) {
      return 'El correo ya existe en la BD.';
    }
    return '';
  }

  submitFormulario() {
    console.log('Submit Formulario ... ', this.miFormulario.value);
    this.miFormulario.markAllAsTouched;
  }
}
