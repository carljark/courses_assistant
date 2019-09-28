import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CursosService } from '../../shared/services/cursos.service';
import {LessonsService} from '../../shared/services/lessons.service';
import { LoginService } from '../../shared/services/login.service';
import IdCursoNombre from '../../shared/interfaces/clase.idcursonombre';
import { ImagenesService } from '../../shared/services/imagenes.service';
import {Lesson} from '../../shared/interfaces/lesson.class';
import {BackupService} from '../../shared/services/backup.service';

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
    private backupService: BackupService,
    private curserv: CursosService,
    private logser: LoginService,
    private imgServ: ImagenesService,
    private lessonsService: LessonsService
  ) {
    this.courses$ = this.curserv.getCoursesSubject();

    this.lessons$ = this.imgServ.getLessonsSubject();
  }
  ngOnInit() {
    this.coursesSubs = this.courses$
    .subscribe(cs => {
      this.courses = cs;
      this.actualCourse = this.logser.getCursoActual();
    });

    // voy a hacer una segunda subscripcion a las lessons
    // dependa de los cursos, así que lo mis hay que fusionarlas
    this.lessonsSubs = this.lessons$
    .subscribe(lessons => {
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

  public backup() {
    this.backupService.backup()
    .subscribe((ok) => {
      console.log('ok: ', ok);
    });
  }

}
