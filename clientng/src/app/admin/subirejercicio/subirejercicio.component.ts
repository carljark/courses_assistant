import { Component, OnInit, Input} from '@angular/core';
import { Exercise } from '../exercise.class';
import { ImagenesService } from '../../shared/imagenes.service';

@Component({
  selector: 'app-subirejercicio',
  templateUrl: './subirejercicio.component.html',
  styleUrls: ['./subirejercicio.component.css']
})
export class SubirejercicioComponent implements OnInit {
  @Input() idsnapshot = 0;
  @Input() idcurso = 0;
  tipoarchivo = 'ejercicio';

  constructor(
    private imgService: ImagenesService
  ) { }

  ngOnInit() {
    console.log('idsnapshot: ', this.idsnapshot);
    console.log('idcurso: ', this.idcurso);
  }
  onEjercicio(ejercicio: Exercise): void {
    console.log('solicitud en subirejercicio');
    this.imgService.insertarEjerciciodb(ejercicio)
    .subscribe(data => {
      ejercicio.id = data;
    });
  }
}
