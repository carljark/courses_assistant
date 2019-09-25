import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import RespServ from './respserv.interface';
import { Lesson } from './lesson.class';
import { Exercise } from '../admin/exercise.class';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query, LessonInput} from './types';
import IdCursoNombre from './clase.idcursonombre';

@Injectable()
export class ImagenesService {

  publicServerDir = 'courses';
  lessonsDirName = 'lessons';
  carpImagenes$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  carpImagenes: string;

  lessons$: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);

  actualCourse$: Observable<IdCursoNombre>;
  actualCourseSubs: Subscription;
  actualCourse: IdCursoNombre;

  urlbase = '';
  iduser = 0;
  idcurso = 0;
  admin = false;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private urlapi = '';
  private urlapiactualizar = '';
  archivo = '';
  constructor(
    private http: HttpClient,
    private logsrv: LoginService,
    private apollo: Apollo
    ) {
      this.actualCourse$ = this.logsrv.getCursoActual$();
      this.actualCourseSubs = this.actualCourse$
      .subscribe(course => {
        this.actualCourse = course;
        this.setLessons().subscribe();
        this.setCarpImgs();
      });

      this.urlbase = environment.urlServer;
      this.urlapi = this.urlbase + '/api/portada';
      this.urlapiactualizar = this.urlbase + '/api/actualizar';
      this.iduser = logsrv.getUserId();
      this.admin = logsrv.admin;
      if (!this.admin) {
      }
      logsrv.construirCabecera();
  }

  initportadabd(): Observable<Lesson[]> {
    const url = this.urlbase + '/api/' + 'initportada';
    return this.http.post<Lesson[]>(url, {}, this.logsrv.getHttpOptions());
  }

  setLessons(): Observable<Lesson[]> {
     return this.apollo.watchQuery<Query>({
       fetchPolicy: 'no-cache',
       errorPolicy: 'ignore',
       query: gql`
          query lessons {
            lessons(idcurso: ${this.actualCourse.idcurso}) {
              id
              archivo
              nombremostrado
              serie
              editsino
              idcurso
           }
         }
        `
     })
     .valueChanges
      .pipe(
        map(result => {
          this.lessons$.next(result.data.lessons);
          return result.data.lessons;
        })
      );
  }

  getLessonsSubject(): BehaviorSubject<Lesson[]> {
    return this.lessons$;
  }

  getLessonText(idLesson: number): Observable<Lesson> {
    return this.apollo.watchQuery<Query>({
      query: gql`
        query lesson {
          lesson(id: ${idLesson}) {
            text
            fulltext
          }
        }
      `
    })
    .valueChanges
    .pipe(
      map(result => {
        // console.log('lesson.fulltext', result.data.lesson.fulltext);
        return result.data.lesson;
      })
    );
  }

  getimgsbd(tabla: string): Observable<Lesson[]> {
    const url = this.urlbase + '/api/' + tabla;
    return this.http.post<Lesson[]>(url, {}, this.logsrv.getHttpOptions());
  }

  obtenerEscena(id: number): Observable<Lesson> {
    const url = `${this.urlapi}/${id}`;
    return this.http.get<Lesson>(url, this.logsrv.getHttpOptions());
  }

  obtenerEjercicios(idEscena: number): Observable<Exercise[]> {
    const url = `${this.urlapi}/ejercicios`;
    const body = {
      idlesson: idEscena
    };
    return this.http.post<Exercise[]>(url, body, this.logsrv.getHttpOptions());
  }

  actualizarImagen(imagen: Lesson): Observable<RespServ> {
    const urlmeter = `${this.urlapiactualizar}/${imagen.id}`;
    const body = {
      imagen: {
        id: imagen.id,
        archivo: imagen.archivo,
        nombremostrado: imagen.nombremostrado,
        serie: imagen.serie,
        editsino: imagen.editsino,
        idcurso: imagen.idcurso
      }
    };
    return this.http.put<RespServ>(urlmeter, body, this.logsrv.getHttpOptions());
  }

  insertLessonDb(lesson: LessonInput): Observable<any> {
    const postRepository = gql`
    mutation post($lesson: LessonInput!){
      post(lesson: $lesson) {
        id
      }
    }
    `;
    return this.apollo.mutate({

      mutation: postRepository,
      variables: {
        lesson
      }
    });
 }
  updateLessonDb(lesson: Lesson): Observable<any> {
    // console.log('lessontext: ', lesson.text);
    const lessoninput: LessonInput = {
      id: parseInt(lesson.id.toString(), 10),
      archivo: lesson.archivo,
      idcurso: lesson.idcurso,
      nombremostrado: lesson.nombremostrado,
      text: lesson.text,
    };
    const postRepository = gql`
    mutation updatelessontext($lesson: LessonInput!){
      updatelessontext(lesson: $lesson) {
        id
      }
    }
    `;
    return this.apollo.mutate({

      mutation: postRepository,
      variables: {
        lesson: lessoninput
      }
    });
 }


  insertarEjerciciodb(ejercicio: Exercise): Observable<number> {
    const urlinsertar = `${this.urlbase}/api/insertar/ejercicio`;
    // console.log('ejercicio: ', ejercicio);
    const body = ejercicio;
    return this.http.post<number>(urlinsertar, body, this.logsrv.getHttpOptions());
  }

  borrarImagendb(imagen: Lesson): Observable<Lesson> {
    // console.log('borramos el snapshot');
    return this.http.post<Lesson>(`${this.urlapiactualizar}/${imagen.id}`, this.logsrv.getHttpOptions());
  }

  getpb(): string {
    return localStorage.getItem('publickey');
  }

  setCarpImgs() {
    this.carpImagenes = `${environment.urlServer}/${this.publicServerDir}/${this.actualCourse.idcurso}/${this.lessonsDirName}/`;
    this.carpImagenes$.next(this.carpImagenes);
  }

  getCarpImgsSubject(): BehaviorSubject<string> {
    return this.carpImagenes$;
  }

}

