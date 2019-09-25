import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LessonsComponent } from './main/courses/courses-nav/lessons/lessons.component';
import { CoursesNavComponent } from './main/courses/courses-nav/courses-nav.component';
import { LessonComponent } from './main/courses/courses-nav/lessons/lesson/lesson.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { RegistroComponent } from './main/registro/registro.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/cursos',
    pathMatch: 'full'
  },
  {
    path: 'cursos',
    component: CoursesNavComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    data: { tabla: 'lessons' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'lesson/:id',
    component: LessonComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
