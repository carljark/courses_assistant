import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SendfichService } from '../../../../sendfich.service';
import { Lesson } from '../../../../../shared/lesson.class';
import { Exercise } from '../../../../exercise.class';
import { LoginService } from '../../../../../shared/login.service';
import IdCursoNombre from '../../../../../shared/clase.idcursonombre';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @Input() lesson: Lesson;
  @Input() tipoarchivo = '';

  actualCourse$: Observable<IdCursoNombre>;
  actualCourseSubs: Subscription;
  cursoActual: IdCursoNombre;

  @Output() updateText: EventEmitter<string> = new EventEmitter<string>();
  @Output() ejercicio: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  ficheros: File[] = new Array<File>();
  constructor(
    private sendFich: SendfichService,
    private loginsrv: LoginService
  ) {
    this.actualCourse$ = this.loginsrv.getCursoActual$();
  }

  ngOnInit() {
    this.actualCourseSubs = this.actualCourse$.subscribe(course => {
      this.cursoActual = course;
    });
  }

  enviarfichero() {
    this.ficheros.forEach((fich, index, matriz) => {
      console.log('tipoarchivo: ', this.tipoarchivo);
      // si el tipoarchivo es texto no hay que emitir ejercicio
      // tengo que conseguir la lesson y cambiarla
      this.sendFich
        .enviarunicofichero(
          fich,
          this.cursoActual.idcurso,
          this.tipoarchivo,
          this.lesson.id
        ) // meter el idimagen
        .subscribe(respuesta => {
          if (this.tipoarchivo === 'texto') {
            this.updateText.emit(fich.name);
          } else {
            const ejercicio: Exercise = {
              idsnapshot: this.lesson.id,
              archivo: fich.name
            };
            this.ejercicio.emit(ejercicio);
          }
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
