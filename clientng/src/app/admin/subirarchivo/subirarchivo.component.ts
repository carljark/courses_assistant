import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { SendfichService } from '../../shared/services/sendfich.service';
import { Lesson } from '../../shared/interfaces/lesson.class';
import { Exercise } from '../../shared/interfaces/exercise.class';
import { camelize } from '../../shared/functions/camelize';
import { LoginService } from '../../shared/services/login.service';
import IdCursoNombre from '../../shared/interfaces/clase.idcursonombre';

@Component({
  selector: 'app-subirarchivo',
  templateUrl: './subirarchivo.component.html',
  styleUrls: ['./subirarchivo.component.css']
})
export class SubirarchivoComponent implements OnInit {
  @Input() idsnapshot = 0;
  @Input() tipoarchivo = '';
  @Input() cursoActual: IdCursoNombre = { idcurso: 0, nombrecurso: '', activo: false };
  cursSubscript: Subscription;
  cursoactual$ = new Observable<IdCursoNombre>();
  @Input() idcurso: number;
  @Output() imagen: EventEmitter<Lesson> = new EventEmitter<Lesson>();
  @Output() ejercicio: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  ficheros: File[] = [];
  constructor(
    private sendFich: SendfichService,
    private loginsrv: LoginService
    ) {
      this.cursoactual$ = this.loginsrv.getCursoActual$();
    }

    ngOnInit() {
      // this.idcurso = this.cursoActual.idcurso;
      this.cursSubscript = this.cursoactual$
      .subscribe(c => {
        this.idcurso = c.idcurso;
        this.cursoActual = c;

      })
  }

  enviarfichero() {
    console.log('this.idcurso: ', this.idcurso);
    console.log('this.cursoActual.idcurso: ', this.cursoActual.idcurso); // mal

    this.ficheros.forEach((fich, index, matriz) => {
      const img: Lesson = {archivo: fich.name, nombremostrado: camelize(fich.name.slice(0, -4)), idcurso: this.cursoActual.idcurso};
      const ejercicio: Exercise = {idsnapshot: this.idsnapshot, archivo: fich.name};
      this.sendFich.enviarunicofichero(fich, this.cursoActual.idcurso, this.tipoarchivo, this.idsnapshot) // meter el idimagen
        .subscribe(respuesta => {
          this.imagen.emit(img);
          this.ejercicio.emit(ejercicio);
        });
    });
  }

  onFileChanged(evento) {
    this.ficheros = null;
    this.ficheros = [];
    for (let i = 0; i < evento.target.files.length; i++) {
      this.ficheros.push(evento.target.files[i]);
    }
  }
}
