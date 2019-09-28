import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../../../../shared/interfaces/lesson.class';
import { ImagenesService } from '../../../../../shared/services/imagenes.service';
import { Exercise } from '../../../../../shared/interfaces/exercise.class';
import {Observable, Subscription} from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  fullText: string;
  lesson$: Observable<Lesson>;
  lesson: Lesson;
  rutaimagen = '';
  rutaejercicio = '';

  orgImgs$: Observable<string>;
  orgImgsSubs: Subscription;
  orgImgs: string;

  ejercicio = new Exercise();
  constructor(
    private imgService: ImagenesService,
    private route: ActivatedRoute,
  ) {

    this.orgImgs$ = this.imgService.getCarpImgsSubject();

    this.lesson$ = this.imgService.obtenerEscena(+this.route.snapshot.paramMap.get('id'))
    .pipe(
      tap(lesson => {
        this.rutaimagen = `${this.orgImgs}/${lesson.archivo}`;
        this.lesson = lesson;
      }),
      switchMap(lesson => this.getText(lesson.id))
    );
  }

  ngOnInit() {
    this.orgImgsSubs = this.orgImgs$
    .subscribe((org) => this.orgImgs = org);

    this.lesson$.subscribe((les => {
      this.lesson = les;
    }));

    this.prepareExercise();
  }

  getText(id: number): Observable<Lesson> {
    return this.imgService.getLessonText(id);
  }

  prepareExercise(): void {
    // se obtendrá un array de resultados que habrá que desglosar con un foreach cuando haya más de 1 ejercicio por snapshot
    const id = +this.route.snapshot.paramMap.get('id');
    this.imgService.obtenerEjercicios(id)
    .subscribe(ej => {
      if (ej && ej.length) {
        this.ejercicio = ej[0];
        this.rutaejercicio = `${this.orgImgs}${id}/ejercicio/${this.ejercicio.archivo}`;
      }
    });
  }

}

