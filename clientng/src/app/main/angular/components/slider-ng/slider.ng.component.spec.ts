import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNgComponent } from './slider.ng.component';

describe('SliderComponent', () => {
  let component: SliderNgComponent;
  let fixture: ComponentFixture<SliderNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
