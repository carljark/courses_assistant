import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule} from './admin/admin-routing.module';
import { AngularModule } from './main/angular/angular.module';
import { AngularRoutingModule } from './main/angular/angular-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { NavComponent } from './main/nav/app-nav.component';

import { LessonComponent } from './main/courses/courses-nav/lessons/lesson/lesson.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImagenesService } from './shared/imagenes.service';
import { NgModule } from '@angular/core';
import { LessonsComponent } from './main/courses/courses-nav/lessons/lessons.component';
import { LoginComponent } from './main/login/login.component';
import { LoginService } from './shared/login.service';
import { SendfichService } from './admin/sendfich.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubirarchivoComponent } from './admin/subirarchivo/subirarchivo.component';
import { SecurePipe } from './shared/secure.pipe';
import { AuthtokenService } from './shared/authtoken.service';
import { RegistroComponent } from './main/registro/registro.component';
import { CursosService } from './shared/cursos.service';
import { SubirejercicioComponent } from './admin/subirejercicio/subirejercicio.component';
import { GraphQLModule } from './graphql.module';
import { CoursesNavComponent } from './main/courses/courses-nav/courses-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import {LessonTextComponent} from './main/courses/courses-nav/lessons/lesson/lesson-text/lesson-text.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LessonsComponent,
    LessonComponent,
    LessonTextComponent,
    LoginComponent,
    SubirarchivoComponent,
    SecurePipe,
    RegistroComponent,
    SubirejercicioComponent,
    CoursesNavComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    AdminRoutingModule,
    AngularModule,
    AngularRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthtokenService, multi: true},
    ImagenesService,
    LoginService,
    SendfichService,
    CursosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
