import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { FronteraPais } from '../interfaces/frontera.interface';
import { PaisPorCodigo } from '../interfaces/pais-codigo.interface';
import { Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  get regiones(){ // Array destructurado, devuelve una copia del array original
    return  [...this._regiones];
  }

  getPaisesPorRegion(region: string): Observable<Pais[]>{
    const url : string = `${this._baseUrl}/region/${region}?fields=name,cca2`;
    return this.http.get<Pais[]>(url);
  }

  getFronterasPorPais(pais : string):Observable<FronteraPais[] | null>{

    if ( ! pais){
      return of(null);
    }

   const url : string = `${this._baseUrl}/alpha/${pais}`
   return this.http.get<FronteraPais[]>(url);
  }


  getNombrePaisPorCodigo(codigoPais: string):Observable<PaisPorCodigo>{
    const url : string = `${this._baseUrl}/alpha/${codigoPais}/?fields=name,cca3`
    return this.http.get<PaisPorCodigo>(url);
  }

  getPaisesPorFronteras( fronteras:string[]):Observable<PaisPorCodigo[]>{
    if (!fronteras){
      return of([]);
    }

    const peticiones: Observable<PaisPorCodigo>[] = [];

    //Solo se guarda la peticion, no se pone el subscribe
    //Guarda un arreglo de Observables
    fronteras.forEach(codigo =>{
      const peticion = this.getNombrePaisPorCodigo(codigo);
      peticiones.push(peticion);
    });

    //Aqui se disparan todas las peticiones
    return combineLatest(peticiones);
  }
}
