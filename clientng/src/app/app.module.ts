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
import { NgModule } from '@angular/core';
import { LessonsComponent } from './main/courses/courses-nav/lessons/lessons.component';
import { LoginComponent } from './main/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubirarchivoComponent } from './admin/subirarchivo/subirarchivo.component';
import { SecurePipe } from './shared/secure.pipe';
import { AuthtokenService } from './shared/services/authtoken.service';
import { RegistroComponent } from './main/registro/registro.component';
import { SubirejercicioComponent } from './admin/subirejercicio/subirejercicio.component';
import { GraphQLModule } from './graphql.module';
import { CoursesNavComponent } from './main/courses/courses-nav/courses-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {LessonTextComponent} from './main/courses/courses-nav/lessons/lesson/lesson-text/lesson-text.component';

import {SendfichService} from './shared/services/sendfich.service';


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
