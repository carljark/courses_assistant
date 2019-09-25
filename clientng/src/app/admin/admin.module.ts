import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SecurePipe } from './secure.pipe';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminNavComponent } from './nav/admin-side-nav.component';
import {EditLessonsComponent} from './edit-lessons/edit-lessons.component';

import {UploadLessonsComponent} from './edit-lessons/upload-lessons/upload-files.component';
import {UploadExercisesComponent} from './edit-lessons/lesson-dashboard/upload-exercises/upload-exercises.component';
import {UploadFilesComponent} from './edit-lessons/lesson-dashboard/upload-exercises/upload-files/upload-files.component';

import {FormUsuarioComponent} from './form-usuario/form-usuario.component';

import {LessonComponent} from './edit-lessons/lesson-table/lesson.component';
import {LessonDashboardComponent} from './edit-lessons/lesson-dashboard/lesson-dashboard.component';

import {ExercisesComponent} from './edit-lessons/lesson-table/exercises/exercises.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserlistComponent } from './form-usuario/userlist/userlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [
    AdminNavComponent,
    SecurePipe,
    EditLessonsComponent,
    UploadLessonsComponent,
    UploadExercisesComponent,
    UploadFilesComponent,
    FormUsuarioComponent,
    LessonComponent,
    LessonDashboardComponent,
    ExercisesComponent,
    UserlistComponent
  ],
  exports: []
})
export class AdminModule { }
