import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { AngularRoutingModule } from './angular-routing.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MapOlComponent } from './components/map-ol/map-ol.component';

import { SliderComponent } from './components/slider/slider.component';
import { SliderNgComponent } from './components/slider-ng/slider.ng.component';
import { GraphbarComponent } from './components/graphbar/graphbar.component';
import { CarouselComponent, CarouselElementDirective} from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselElementDirective,
    CarouselItemDirective,
    GraphbarComponent,
    SliderComponent,
    SliderNgComponent,
    NavComponent,
    MapOlComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class AngularModule { }
