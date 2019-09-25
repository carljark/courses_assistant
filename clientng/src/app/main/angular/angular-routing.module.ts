import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapOlComponent } from './components/map-ol/map-ol.component';
import { NavComponent } from './nav/nav.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderNgComponent} from './components/slider-ng/slider.ng.component';
import { GraphbarComponent } from './components/graphbar/graphbar.component';

const routes: Routes = [
  {
    path: 'angular',
    component: NavComponent,
    children: [
      {
        path: 'mapol',
        component: MapOlComponent
      },
      {
        path: 'slider',
        component: SliderComponent
      },
      {
        path: 'sliderng',
        component: SliderNgComponent
      },
      {
        path: 'graphbar',
        component: GraphbarComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularRoutingModule { }
