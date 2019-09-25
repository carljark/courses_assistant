import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from '../../../../shared/lesson.class';
import { Observable, Subscription } from 'rxjs';
import { ImagenesService } from '../../../../shared/imagenes.service';


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, OnDestroy {


  origenImagenes$: Observable<string>;
  origenImgSubs: Subscription;
  origenImagenes = '';

  lessons$: Observable<Lesson[]>;
  lessonsSubs: Subscription;
  lessons: Lesson[];

  constructor(
    private imgServ: ImagenesService
  ) {
    this.lessons$ = this.imgServ.getLessonsSubject();
    this.origenImagenes$ = this.imgServ.getCarpImgsSubject();
  }
  ngOnInit() {
    this.lessonsSubs = this.lessons$
    .subscribe(lessons => {
      this.lessons = lessons;
    });

    this.origenImgSubs = this.origenImagenes$
    .subscribe(org => {
      this.origenImagenes = org;
    });
  }

  ngOnDestroy() {
    this.lessonsSubs.unsubscribe();
    this.lessonsSubs.unsubscribe();
  }
}
