import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import IdCursoNombre from '../interfaces/clase.idcursonombre';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  coursesSubject: BehaviorSubject<IdCursoNombre[]>;
  cursosUsuario: IdCursoNombre[];
  currentCourseSubject: BehaviorSubject<IdCursoNombre>;
  currentCourse: IdCursoNombre;
  constructor(
    private loginservice: LoginService
  ) {

    this.cursosUsuario = this.loginservice.getIdsCursos();

    this.coursesSubject = new BehaviorSubject<IdCursoNombre[]>(this.cursosUsuario);

    this.currentCourseSubject = new BehaviorSubject<IdCursoNombre>(this.cursosUsuario[0]);


    this.setCourses(this.cursosUsuario);
    this.setCurrentCourse(this.cursosUsuario[0]);
  }
  getCoursesSubject(): Subject<IdCursoNombre[]> {
    return this.coursesSubject;
  }

  setCurrentCourse(course: IdCursoNombre) {
    this.currentCourse = course;
    this.currentCourseSubject.next(course);
  }

  setCourses(courses: IdCursoNombre[]) {
    // console.log('cursos: ', courses);
    this.coursesSubject.next(courses);
  }

  getCurrentCourse(): Subject<IdCursoNombre> {
    return this.currentCourseSubject;
  }
}
