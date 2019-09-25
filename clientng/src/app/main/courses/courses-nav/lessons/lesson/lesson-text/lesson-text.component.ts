import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-lesson-text',
    templateUrl: './lesson-text.component.html',
    styleUrls: ['./lesson-text.component.scss']
})
export class LessonTextComponent implements OnInit{

    @Input() texto: string;

    constructor(
    ) {}

    ngOnInit() {
        console.log('texto: ', this.texto);
    }


}
