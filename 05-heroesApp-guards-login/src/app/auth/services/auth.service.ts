import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', //Servicio global
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) {}

  //En el login se settea, aqui se devuelve,  se usa en el Guard y en el Home.html
  get auth(): Auth {
    return { ...this._auth! }; // Pasar solo una copia del valor real
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    ); //pipe y tap, recuperan el valor, pero login() sigue devolviendo el Observable
  }

  logout() {
    this._auth = undefined;
  }

  verificaAutenticacion(): Observable<boolean> {
    //Si no existe el token, emite un Observable<false>
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    //Si existe, validar que sea el del servicio ó BD y emite Observable<true>
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        console.log('verificaAutenticacion Modificando con map : ', auth);
        this._auth = auth; // Para no perder el usuario, que se muestra en el home
        return true;
      })
    );
  }
}
