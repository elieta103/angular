import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    return this.http
      .get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      .pipe(
        delay(1000), //Antes de obtener la repuesta el servicio demora 1 seg. Simula tiempo de espera
        map((resp) => {
          return resp.length === 0 ? null : { emailTomado: true };
        })
      );
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
