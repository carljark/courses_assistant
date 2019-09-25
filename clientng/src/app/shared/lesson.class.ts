export class Lesson {
  id?: number;
  nombremostrado?: string;
  archivo: string;
  serie?: string;
  editsino?: boolean;
  meter?: boolean;
  idcurso: number;
  text?: string;
  fulltext?: string;

  constructor() {
    this.id = 0;
    this.nombremostrado = '';
    this.archivo = '';
    this.serie = '';
    this.editsino = false;
    this.meter = false;
    this.idcurso = 0;
    this.text = '';
  }
}

