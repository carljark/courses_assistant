import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from '../../../shared/interfaces/lesson.class';
import { ImagenesService } from '../../../shared/services/imagenes.service';
import { camelize } from '../../../shared/functions/camelize';

import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'admin-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.scss']
})
export class LessonDashboardComponent implements OnInit, OnDestroy {
  @Input() lesson: Lesson;
  @Output() deletedLesson: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  origenImagenes: string;
  origenImagenes$: Observable<string>;
  origenImagenesSubs: Subscription;

  constructor(
      private imgService: ImagenesService
  ) {
    this.origenImagenes$ = this.imgService.getCarpImgsSubject();
  }

  ngOnInit() {
    this.origenImagenesSubs = this.origenImagenes$
    .subscribe(orgImgs => {
      this.origenImagenes = orgImgs;
    });
  }

  ngOnDestroy() {
    this.origenImagenesSubs.unsubscribe();
  }

  borrarImagen(lesson: Lesson): void {
    console.log('se emite la lesson a borrar');
    this.deletedLesson.emit(lesson);
  }

  onSubmit(imagen: Lesson): void {
    imagen.nombremostrado = camelize(imagen.nombremostrado);
    this.imgService.actualizarImagen(imagen).subscribe(resp => {
      // crear un enum con los 3 códigos de actualizar la imagen en la bd en el servidor
      if (resp.codigo === 1) {
        // error en la base de datos
      }
      if (resp.codigo === 2) {
      }
      imagen.meter = false;
    });
  }
}
