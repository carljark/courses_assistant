import { Lesson } from './lesson.class';

export class Imagen {
  id: number;
  nombremostrado: string;
  archivo: string;
  serie: string;
  editsino: boolean;
  idcurso: number;
  constructor() {
    this.id = 0;
    this.nombremostrado = '';
    this.archivo = '';
    this.serie = '';
    this.editsino = false;
    this.idcurso = 0;
  }
}

export interface Query {
    lessons: Lesson[];
    lesson: Lesson;
}

export interface Mutation {
  lesson: Lesson;
}

export interface LessonInput {
  id?: number;
  archivo: string;
  nombremostrado?: string;
  idcurso: number;
  text?: string;
}
