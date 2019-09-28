import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { User, UseryToken, Credenciales } from '../interfaces/user.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  logueado = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  urlServidor = '';
  usuariosUrl = '';
  urlServidorAdmin = '';
  data: string;
  credencialActual: Credenciales = {mail: '', password: ''};
  usuarioActual: User = {
    userid: null,
    nombre: null,
    apellidos: null,
    cPostal: null,
    domicilio: null,
    mail: null,
    pais: null,
    password: null,
    password2: null,
    provincia: null,
    tel: null
  };

  constructor(
    private http: HttpClient
    ) {
      this.urlServidor = environment.urlServer;
      this.usuariosUrl = `${this.urlServidor}/api/users`;
      this.urlServidorAdmin = `${this.urlServidor}/api/users`;
    // chequeamos si el usuario tiene token para conseguir los datos de usuario
    // del servidor
      const token = this.getToken();
      if (token) {
      this.setHttpOptions(token);
      this.setLogueado(true);
      // solicitamos los datos de usuario del servidor
      this.tokenGetUserData();
    }
  }

  // POST para enviar los datos de registro (y/o actualizarlos?)
  postUsuario( user: User ): Observable<User> {
    return this.http.post<User>( this.usuariosUrl, user )  // despues de _usuario irían los headers
      .pipe(
        catchError(this.handleError('postUsuario', user))
      );
  }

  addUser( user: User ): Observable<number> {
    return this.http.post<number>( this.usuariosUrl, user )  // despues de _usuario irían los headers
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }


  conseguirDatosDeUsuario(): Observable<User> {
    return this.http.post<User>(this.usuariosUrl, this.credencialActual);
  }

  // DELETE
  deleteUsuario(id: number): Observable<{}> {
    const url = `${this.usuariosUrl}/${id}`; // DELETE api/usuarios/42
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  borrarUsuarioporMail(mail: string): Observable<User> {
    // añadimos el token para que el header vaya con autentificacion
    return this.http.post<User>(this.urlServidorAdmin, {mail}, this.getHttpOptions());
  }

  loginUsuario(usuario: Credenciales): Observable<UseryToken> {
    console.log('llegamos a loginUsuario del usuarios.service');
    return this.http.post<UseryToken>( `${this.usuariosUrl}/login`, usuario );
    // return this._http.post<User>( 'http://192.168.1.3:8080/api/usuarios/login', usuario );
/*     .pipe(
      catchError(this.handleError('login'))
    ); */
  }

  tokenGetUserData(): Observable<User> {
    return this.http.post<User>( `${this.usuariosUrl}/userdata`, {}, this.getHttpOptions());
  //   .subscribe(usuario => {
  //     this.usuarioActual = usuario;
  //     console.log('usuario en setuserdata', usuario);
  //   });
    // guardar datos en el usuarioactual usuarioactual

    // vamos a usar map para que los datos estén disponibles antes de que
    // se usen en el componente user-detalles
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUserId(id: number) {
    localStorage.setItem('userid', id.toString());
  }
  getUserId(): number {
    return parseInt(localStorage.getItem('userid'), 10);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }

  setUserActual(user: User) {
    this.usuarioActual = user;
  }

  setLogueado(sino: boolean) {
    this.logueado = sino;
  }

  getLogueado(): boolean {
//     if (this.getToken()) {
//       this.setLogueado(true);
//     } else {
//       this.setLogueado(false);
//     }
    return this.logueado;
  }

  getUserActual(): User {
    console.log('getUserActual en usuarios.service');
    return this.usuarioActual;
  }

  handleError(error: string, usu?: User): any {
    console.log('controlando los errores');
  }

  setHttpOptions(token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      })
    };
  }
  getHttpOptions(): { headers: HttpHeaders} {
    console.log('gethttpoptions');
    return this.httpOptions; // mal porque tiene que venir del servicio de login
  }
  construirCabecera() {
    console.log('construircabecera');
    const tokenactual = localStorage.getItem('token');
    console.log('tokenactual: ', tokenactual);
    this.setHttpOptions(tokenactual);
  }
}
