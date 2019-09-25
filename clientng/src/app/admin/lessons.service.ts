import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import IdCursoNombre from '../shared/clase.idcursonombre';
import { CursosService } from '../shared/cursos.service';
import gql from 'graphql-tag';
import { Query } from '../shared/types';
import {Lesson} from '../shared/lesson.class';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  courses: IdCursoNombre[];

  currentCourse$: Observable<IdCursoNombre>;
  currentCourseSubs: Subscription;
  currentCourse: IdCursoNombre;

  currentLessonSubject: BehaviorSubject<Lesson> = new BehaviorSubject<Lesson>({archivo: '', editsino: false, id: null, idcurso: null});
  currentLesson: Lesson;

  lessonsSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  lessons: Lesson[];

  constructor(
    private apollo: Apollo,
    private coursesService: CursosService
    ) {
      this.currentCourse$ = this.coursesService.getCurrentCourse();
      this.currentCourseSubs = this.currentCourse$
      .subscribe(cur => {
        this.currentCourse = cur;
        // necesito el curso actual
        this.getLessonsFromCourse$(this.currentCourse.idcurso).subscribe();
      });
  }

  getLessonsFromCourse$(idcurso: number): Observable<Lesson[]> {
    return this.apollo
      .watchQuery<Query>({
        query: gql`
        query lessons {
          lessons(idcurso: ${idcurso}) {
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
      .valueChanges.pipe(
        map(result => {
          this.currentLesson = result.data.lessons[0];
          this.lessons = result.data.lessons;
          this.lessonsSubject.next(result.data.lessons);
          this.setCurrentLesson(result.data.lessons[0]);
          return result.data.lessons;
        })
      );
  }

  getLessons$(): BehaviorSubject<Lesson[]> {
    return this.lessonsSubject;
  }

  setCurrentLesson(lesson: Lesson) {
    console.log('cambio de leccion y se emite');
    this.currentLesson = lesson;
    this.currentLessonSubject.next(lesson);
  }

  getCurrentLesson$(): BehaviorSubject<Lesson> {
      return this.currentLessonSubject;
  }
}
