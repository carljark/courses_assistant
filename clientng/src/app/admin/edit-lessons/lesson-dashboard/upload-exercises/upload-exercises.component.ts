import { Component, OnInit, Input} from '@angular/core';
import { Exercise } from '../../../../shared/interfaces/exercise.class';
import { ImagenesService } from '../../../../shared/services/lessons.service';
import { Lesson } from '../../../../shared/interfaces/lesson.class';
@Component({
  selector: 'app-upload-exercises',
  templateUrl: './upload-exercises.component.html',
  styleUrls: ['./upload-exercises.component.css']
})
export class UploadExercisesComponent implements OnInit {
  @Input() lesson: Lesson;
  tipoarchivo = 'ejercicio';

  constructor(
    private imgService: ImagenesService
  ) { }

  ngOnInit() {
  }
  onEjercicio(ejercicio: Exercise): void {
    // despues de haber enviado el archivo al servidor
    // se emite un evento ejercicio que se recoge
    // en este método
    // es decir, ahora vamos a insertarlo en la
    // base de datos
    // si el tipoarchivo es texto
    // ejecutamos otra función
    console.log('solicitud en subirejercicio');
    this.imgService.insertarEjerciciodb(ejercicio)
    .subscribe(data => {
      ejercicio.id = data;
    });
  }

  onLessonUpdateText(lessonText: string): void {

    this.lesson.text = lessonText;

    this.imgService.updateLessonDb(this.lesson)
    .subscribe(data => {
      console.log('datos actualizados en la leccion');
      console.log(data);
    });

  }

  changeTypeFile(event) {
    // tengo que guardar el curso actual en el servicio
    // además tengo que pasar las siguientes funciones
    // también en el mismo servicio coursesService y lessonsService para
    // que esté todo centralizado
    const typeFile = event.target.value;
    this.tipoarchivo = typeFile;
    // console.log('event tipoarchivo: ', event);
    console.log('tipoarchivo: ', this.tipoarchivo);
  }
}
