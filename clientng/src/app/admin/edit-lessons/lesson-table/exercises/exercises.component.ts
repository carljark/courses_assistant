import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../../../shared/interfaces/exercise.class';
import {ExercisesService} from '../../../../shared/services/exercises.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-exercises',
    providers: [ExercisesService],
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

    exercises$: Observable<Exercise[]>;
    exercisesSubs: Subscription;
    exercises: Exercise[];

    constructor(

        private exServ: ExercisesService

    ) {
        this.exercises$ = this.exServ.getExercisesSubject();

    }

    ngOnInit() {

        this.exercisesSubs = this.exercises$
        .subscribe(exs => {
            this.exercises = exs;
        });

    }

    delExer(id: number): void {
        this.exServ.delExer(id)
        .subscribe(idDeleted => {
            console.log('id borrado: ', idDeleted);
        });

    }

    habilitarEdit(ex: Exercise) {

    }

}