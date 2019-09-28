import { Injectable } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Exercise } from '../interfaces/exercise.class';
import { environment } from '../../../environments/environment';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

import { LessonsService } from './lessons.service';
import { Lesson } from '../interfaces/lesson.class';
import { switchMap } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  exercisesSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<
    Exercise[]
  >([]);
  exercises: Exercise[];
  // sustituir idcurso por una manera mejor de buscar el curso actual
  idcurso: number;
  currentLesson$: Observable<Lesson>;
  currentLessonSubs: Subscription;

  ejercicio: Exercise;
  rutaejercicio = '';
  origenimagenes = '';

  urlbase = environment.urlServer;
  urlapi = this.urlbase + '/api/portada';

  constructor(
    private logsrv: LoginService,
    private lessonsService: LessonsService,
    private http: HttpClient,
    private apollo: Apollo
  ) {
    this.currentLesson$ = this.lessonsService.getCurrentLesson$();
    this.currentLesson$
      .pipe(
        switchMap(lesson => {
          this.idcurso = lesson.id;
          return this.getExercises(lesson.id);
        })
      )
      .subscribe(exs => {
        this.exercisesSubject.next(exs);
      });
  }

  descargarEjercicio(): void {
    // se obtendrá un array de resultados que habrá que desglosar con un foreach cuando haya más de 1 ejercicio por lección
    this.getExercises(this.idcurso).subscribe(ej => {
      this.ejercicio = ej[0];
      // al recargar el id es incorrecto
      this.rutaejercicio = `${this.origenimagenes}${this.idcurso}/ejercicio/${
        this.ejercicio.archivo
      }`;
    });
  }

  getExercises(idlesson: number): Observable<Exercise[]> {
    // cambiar por una consulta a graphql
    const url = `${this.urlapi}/ejercicios`;
    const body = { idlesson };
    return this.http.post<Exercise[]>(url, body);
  }

  getExercisesSubject() {
    return this.exercisesSubject;
  }

  insertarEjerciciodb(ejercicio: Exercise): Observable<number> {
    const urlinsertar = `${this.urlbase}/api/insertar/ejercicio`;
    const body = ejercicio;
    return this.http.post<number>(
      urlinsertar,
      body,
      this.logsrv.getHttpOptions()
    );
  }

  delExer(idNumber: number) {
    // parece que en mutation se debe declarar las variables
    // tipo $id, por ejemplo, cuando las vamos a asignar
    const gqlDelExer = gql`
      mutation delexer {
        delexer(id: ${idNumber}) {
          id
        }
      }
  `;
    return this.apollo.mutate({
      mutation: gqlDelExer
    });
  }
}
