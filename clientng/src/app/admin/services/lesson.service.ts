import { Injectable } from '@angular/core';
import { Lesson } from '../../shared/interfaces/lesson.class';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor() {
  }

  cambiarPropEditSiNo(objeto: Lesson) {
    objeto.editsino = !objeto.editsino;
  }
}
