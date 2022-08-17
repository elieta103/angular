import { Directive, Input } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[customMin][ngModel]', //Debe tener customMin y NgModel en el form para poder usarse
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomMinDirective,
      multi: true,
    },
  ],
})
export class CustomMinDirective implements Validator {
  //Para recibirlo del padre
  @Input() minimo!: number;

  constructor() {}

  validate(control: FormControl): ValidationErrors | null {
    const inputValue = control.value;
    console.log(inputValue + ' minimo: ' + this.minimo);
    return inputValue < this.minimo ? { customMin: true } : null;
  }
}
