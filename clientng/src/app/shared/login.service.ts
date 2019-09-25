import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import AuthClient from './clase.authclient';
import IdCursoNombre from './clase.idcursonombre';
import {environment} from '../../environments/environment';

class User {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {

  cursoActual: IdCursoNombre = {
    activo: null,
    idcurso: null,
    nombrecurso: null
  };
  cursoActual$: BehaviorSubject<IdCursoNombre> = new BehaviorSubject<IdCursoNombre>(this.cursoActual);


  idscursosnombres: IdCursoNombre[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  userid: number;
  carpImagenes = '';
  logueadochange: Subject<boolean> = new Subject<boolean>();
  useridchange: Subject<number> = new Subject<number>();
  adminchange: Subject<boolean> = new Subject<boolean>();
  logueado = false;
  admin = false;
  urlbase = '';

  constructor(
    private http: HttpClient
  ) {
    this.urlbase = `${environment.urlServer}/autenticar`;
    if (this.getLocalToken()) {
      this.setLogueado();
      this.userid = this.getUserId();
      if (this.userid === 1) {
        this.setAdmin(true);
      }
      // eliminamos el siguiente set
      // ya que se establece desde el componente (portada)
      this.setCursoActual(JSON.parse(localStorage.getItem('cursoActual')));
      // console.log('en constructor');
    }
  }

  setAdmin(sino: boolean) {
    this.admin = sino;
    this.adminchange.next(this.admin);

  }
  checkLogin(): any {
    this.http.get<any>(this.urlbase)
      .subscribe(mensaje => {
      });
  }
  login(user: User): Observable<AuthClient> {
    return new Observable<AuthClient>( observador => {
      this.http.post<AuthClient>(this.urlbase, {
        username: user.username,
        password: user.password
      },
      this.httpOptions
      )
      .subscribe((respuesta: AuthClient) => {
        if (respuesta !== null) {
          // console.log('respuesta en login: ', respuesta);
          this.setLogueado();
          this.setLocalToken(respuesta);
          // this.setCarpImgs(respuesta.userid);
          // la anterior no debe de hacer nada
          // con el id del usuario
          // ya que ahora dependen de los ids
          // de los cursos
          this.setUserId(respuesta.userid);
          this.setIdsCursos(respuesta.idscursosnombres);
          this.setCursoActual(respuesta.idscursosnombres[0]);
          this.saveCursoActual(respuesta.idscursosnombres[0]);
          if (this.getUserId() === 1) {
            this.setAdmin(true);
          }
          observador.next(respuesta); // comprobamos que se cambia el userid antes que se devuelva la respuesta al componente login
        } else {
          // console.log('no logueado');
        }
      });
    });
  }
  setIdsCursos(idscursos: IdCursoNombre[]) {
    localStorage.setItem('idscursos', JSON.stringify(idscursos));
    this.idscursosnombres = idscursos;
  }

  getIdsCursos(): IdCursoNombre[] {
    return JSON.parse(localStorage.getItem('idscursos'));
  }
  getAuth = function() {
    return this.logueado;
  };
  getLogueado() {
    return this.logueado;
  }
  setLogueado() {
    this.logueado = true;
    this.logueadochange.next(this.logueado);
  }
  setLocalToken(autorizacion: AuthClient) {
    localStorage.setItem('token', autorizacion.token);
    // localStorage.setItem('publickey', autorizacion.clavePublica);
    this.setUserId(autorizacion.userid);
  }
  getLocalToken(): string {
    return localStorage.getItem('token');
  }
  getLocalKeyPublic(): string {
    return localStorage.getItem('publickey');
  }
  getUserId(): number {
    // console.log('parseint userid: ');
    this.userid = parseInt(localStorage.getItem('userid'), 10);
    return this.userid;
  }

  logout() {
    this.logueado = false;
    this.admin = false;
    this.logueadochange.next(this.logueado);
    this.adminchange.next(this.admin);
    // localStorage.removeItem('publickey');
    // localStorage.removeItem('token');
    localStorage.clear();
  }
  setUserId(id: number): void {
    localStorage.setItem('userid', id.toString());
    this.userid = id;
    this.useridchange.next(this.userid);
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
    // console.log('gethttpoptions');
    return this.httpOptions; // mal porque tiene que venir del servicio de login
  }
  construirCabecera() {
    // console.log('construircabecera');
    const tokenactual = localStorage.getItem('token');
    // console.log('tokenactual: ', tokenactual);
    this.setHttpOptions(tokenactual);
  }
  setCursoActual(curso: IdCursoNombre) {
    // console.log('setCursoActual: ', curso);
    this.cursoActual = curso;
    this.cursoActual$.next(curso);
  }
  saveCursoActual(curso: IdCursoNombre) {
    localStorage.setItem('cursoActual', JSON.stringify(curso));
  }
  getCursoActual(): IdCursoNombre {
    return this.cursoActual;
  }

  getCursoActual$(): BehaviorSubject<IdCursoNombre> {
    return this.cursoActual$;
  }
}
