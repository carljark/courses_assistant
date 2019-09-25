import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CursosService } from '../../shared/cursos.service';
import {LessonsService} from '../lessons.service';
import { LoginService } from '../../shared/login.service';
import IdCursoNombre from '../../shared/clase.idcursonombre';
import { ImagenesService } from '../../shared/imagenes.service';
import {Lesson} from '../../shared/lesson.class';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  coursesSubs: Subscription;
  courses$: Observable<IdCursoNombre[]>;
  courses: IdCursoNombre[];

  actualCourse: IdCursoNombre;

  lessonsSubs: Subscription;
  lessons$: Observable<Lesson[]>;
  lessons: Lesson[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private curserv: CursosService,
    private logser: LoginService,
    private imgServ: ImagenesService,
    private lessonsService: LessonsService
  ) {
    this.courses$ = this.curserv.getCoursesSubject();

    this.lessons$ = this.imgServ.getLessonsSubject();
  }
  ngOnInit() {
    // no subscribe hasta que no se emite en el servicio
    // con behaviorsubject se emiten los cursos que habia en cada subscripcion
    this.coursesSubs = this.courses$
    .subscribe(cs => {
      console.log('paso por aquí?');
      // console.log('cs: ', cs);
      this.courses = cs;
      // this.cursoActual = this.cursos[0];
      this.actualCourse = this.logser.getCursoActual();

      // this.lessons = this.imgServ.getSnapshotsUpdate(this.actualCourse.idcurso);
      // this.selectLesson(this.lessons[0]);
    });

    // voy a hacer una segunda subscripcion a las lessons
    // dependa de los cursos, así que lo mis hay que fusionarlas
    this.lessonsSubs = this.lessons$
    .subscribe(lessons => {
      console.log('se subscribe a lessons');
      this.lessons = lessons;
    });
  }

  selectLesson(lesson: Lesson) {
    this.lessonsService.setCurrentLesson(lesson);
  }

  changeCourse(event) {
    // tengo que guardar el curso actual en el servicio
    // además tengo que pasar las siguientes funciones
    // también en el mismo servicio coursesService y lessonsService para
    // que esté todo centralizado
    const cursoSelected = this.courses[event.target.selectedIndex];
    // this.curserv.setCurrentCourse(cursoSelected);
    this.logser.setCursoActual(cursoSelected);
    this.actualCourse = cursoSelected;
  }

}
