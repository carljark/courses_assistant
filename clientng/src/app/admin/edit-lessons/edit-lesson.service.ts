import { Lesson } from '../../shared/lesson.class';

export class LessonService {

    setLessonId(lesson: Lesson, id: number): void {
        lesson.id = id;
    }
}
