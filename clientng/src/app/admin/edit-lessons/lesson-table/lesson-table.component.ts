import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import {LessonsService} from '../../../shared/services/lessonsgraph.service';
import { Observable, Subscription } from 'rxjs';
import { Lesson } from '../../../shared/interfaces/lesson.class';

@Component({
  selector: 'app-lesson-table',
  templateUrl: './lesson-table.component.html',
  styleUrls: ['./lesson-table.component.scss']
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
