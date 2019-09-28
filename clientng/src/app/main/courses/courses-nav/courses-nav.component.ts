import { Component, OnInit } from '@angular/core';
import IdCursoNombre from '../../../shared/interfaces/clase.idcursonombre';
import { CursosService } from '../../../shared/services/cursos.service';
import { LoginService } from '../../../shared/services/login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'courses-nav',
  templateUrl: './courses-nav.component.html',
  styleUrls: ['./courses-nav.component.scss']
})
export class CoursesNavComponent implements OnInit {

  opcionactiva: boolean;
  cursos: IdCursoNombre[];
  cursoActual$: Observable<IdCursoNombre>;
  cursoActual: IdCursoNombre;
  cursoActualSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private curserv: CursosService,
              private logser: LoginService
    ) {

      this.cursoActual$ = this.logser.getCursoActual$();
    }

  ngOnInit() {
    this.curserv.getCoursesSubject()
    .subscribe(curs => {
      this.cursos = curs;
    });

    // this.cursoActual = this.cursos[0];
    this.cursoActualSubscription = this.logser.getCursoActual$()
    .subscribe(curso => {
      this.cursoActual = curso;
    });

  }


  eligeCurso(curso: IdCursoNombre) {
    this.cursoActual = curso;
    this.logser.setCursoActual(curso);
    this.logser.saveCursoActual(curso);
  }

}
