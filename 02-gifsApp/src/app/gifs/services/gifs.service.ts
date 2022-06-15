import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  //Declarado como un servicio Global
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'VVtUN3u33RcETiaz5ZZYbJbmvS0TV8QY';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gifs[] = [];

  get historial() {
    // Recordar que los obj. se pasan por referencia,
    // Se devuelve una copia del objeto, para evitar cambios en el objeto original
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // Si es null devuelve un array vacio
    /*if (localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }*/
  }

  buscarGifs(query: string) {
    query = query.toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query); // La ultima busqueda se inserta al inicio
      this._historial = this._historial.splice(0, 10); // Solo de vuelve los primeros 10
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados)); //Almacena ultima busqueda
        console.log(resp.data);
      });
  }
}
