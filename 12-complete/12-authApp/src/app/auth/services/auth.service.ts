import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private http: HttpClient) { }

  get usuario(){
    return {... this._usuario};
  }

  registro(name:string, email:string, password:string){
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password};

    return this.http.post<AuthResponse>(url, body)
            .pipe(
              tap ( ({ok, token}) => {
                if( ok ){
                  // Guardar JWT en localStorage
                  localStorage.setItem('token', token!);
                }
              }),
              map( resp => resp.ok ),
              catchError(err => of(err.error.msg))
            );
  }


  login(email:string, password:string){
    const url = `${this.baseUrl}/auth`;
    const body = { email, password};

    return this.http.post<AuthResponse>(url, body)
            .pipe(
              tap (resp => {
                console.log('login');
                console.log(resp);
                if(resp.ok){
                  // Guardar JWT en localStorage
                  localStorage.setItem('token', resp.token!);
                }
              }),
              map( resp => resp.ok ),
              catchError(err => of(err.error.msg))
            );
  }


  //Para usar en el guard debe retornar Observable<boolean>
 validarToken(): Observable<boolean>{
  const url = `${this.baseUrl}/auth/renew`;
  const headers = new HttpHeaders()
                  .set('x-token', localStorage.getItem('token')||''  );

  return this.http.get<AuthResponse>(url, {headers})
          .pipe(
            tap(resp =>{
              console.log('validarToken respuesta :')
              console.log(resp)
            }),
            map(resp => {
              //Inyecta el usuario  en el get
              this._usuario ={
                name : resp.name!,
                uid: resp.uid!,
                email: resp.email!
              }
              // Guardar JWT en localStorage , Actualizado
              localStorage.setItem('token', resp.token!);

              return resp.ok;
            }),
            catchError(err=> of(false))
          );

 }


logout(){
  localStorage.removeItem('token');
}

}
