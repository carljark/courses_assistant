import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonService } from './lesson.service';
import {LessonsService} from '../../lessons.service';
import { Observable, Subscription } from 'rxjs';
import { Lesson } from '../../../shared/lesson.class';

@Component({
  selector: 'app-lesson-table',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnDestroy {
  currentLesson$: Observable<Lesson>;
  currentLessonSubs: Subscription;
  currentLesson: Lesson;

  constructor(
    private lessonService: LessonService,
    private lessonsService: LessonsService
    ) {
    this.currentLesson$ = this.lessonsService.getCurrentLesson$();
  }
  ngOnInit() {
    this.currentLessonSubs = this.currentLesson$
    .subscribe(le => {
      console.log('se cambia de leccion');
      this.currentLesson = le;
    });
  }

  habilitarEdit(lesson: Lesson) {
    this.lessonService.cambiarPropEditSiNo(lesson);
  }

  ngOnDestroy() {
    this.currentLessonSubs.unsubscribe();
  }
}
