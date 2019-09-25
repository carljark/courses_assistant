import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SendfichService } from '../../sendfich.service';
import { Lesson } from '../../../shared/lesson.class';
import { Exercise } from '../../exercise.class';
import { camelize } from '../../../shared/camelize';
import { LoginService } from '../../../shared/login.service';
import IdCursoNombre from '../../../shared/clase.idcursonombre';

@Component({
  selector: 'app-upload-lessons',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadLessonsComponent implements OnInit {
  @Input() idsnapshot = 0;
  @Input() tipoarchivo = '';
  @Input() cursoActual: IdCursoNombre = { idcurso: 0, nombrecurso: '', activo: false };
  @Input() idcurso: number;
  @Output() lesson: EventEmitter<Lesson> = new EventEmitter<Lesson>();
  @Output() ejercicio: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  ficheros: File[] = new Array<File>();
  constructor(
    private sendFich: SendfichService,
    private loginsrv: LoginService
    ) {
    }

    ngOnInit() {
      // this.idcurso = this.cursoActual.idcurso;
      this.idcurso = this.loginsrv.getCursoActual().idcurso;
      this.cursoActual = this.loginsrv.getCursoActual();
  }

  enviarfichero() {
    console.log('this.idcurso: ', this.idcurso);
    console.log('this.cursoActual.idcurso: ', this.cursoActual.idcurso); // mal

    console.log('this.ficheros: ', this.ficheros); // es undefined

    this.ficheros.forEach((fich, index, matriz) => {
      const img: Lesson = {archivo: fich.name, nombremostrado: camelize(fich.name.slice(0, -4)), idcurso: this.cursoActual.idcurso};
      const ejercicio: Exercise = {idsnapshot: this.idsnapshot, archivo: fich.name};
      this.sendFich.enviarunicofichero(fich, this.cursoActual.idcurso, this.tipoarchivo, this.idsnapshot) // meter el idimagen
        .subscribe(respuesta => {
          console.log('se emite');
          this.lesson.emit(img);
          this.ejercicio.emit(ejercicio);
        });
    });
  }

  onFileChanged(evento) {

    console.log('se actualiza la matriz de ficheros');
    console.log('evento: ', evento);
    // this.ficheros = null;
    this.ficheros = new Array<File>();
    for (const i of evento.target.files) {
      console.log('meter i: ', i);
      this.ficheros.push(i); // revisar
    }
  }
}
