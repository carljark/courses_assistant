import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../shared/imagenes.service';
import { LoginService } from '../../shared/login.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {Lesson} from '../../shared/lesson.class';

import {LessonService} from './edit-lesson.service';

@Component({
  providers: [
    LessonService
  ],
  selector: 'app-edit-lessons',
  templateUrl: './edit-lessons.component.html',
  styleUrls: ['./edit-lessons.component.css']
})
export class EditLessonsComponent implements OnInit {

  lessons$: Observable<Lesson[]>;
  lessonsSubs: Subscription;
  lessons: Lesson[];

  constructor(
    private imgService: ImagenesService,
    private logser: LoginService,
  ) {
    this.lessons$ = this.imgService.getLessonsSubject();

  }

  ngOnInit() {
    this.lessons$
    .subscribe(lessons => this.lessons = lessons);
  }

  borrarImagen(lesson: Lesson): void {
    this.imgService.borrarImagendb(lesson).subscribe(data => {
      // this.lessons = this.lessons.filter(img => img.id !== imagen.id);
      this.lessons.splice(this.lessons.lastIndexOf(lesson), 1);
    });
}

  initportada(): void {
    this.imgService.initportadabd()
    .subscribe(data => {
      this.lessons = data;
    });
  }

  onLesson(lesson: Lesson): void {
    console.log('se recibe desde app-upload-lesson');
    this.imgService.insertLessonDb(lesson)
    .pipe(
      map(result => {
        lesson.id = result.data.post.id;
        lesson.meter = false;
        return lesson;
      })
    )
    .subscribe((les) => {
      this.lessons.push(les);
    });
  }

  logout() {
    this.logser.logout();
  }

}

