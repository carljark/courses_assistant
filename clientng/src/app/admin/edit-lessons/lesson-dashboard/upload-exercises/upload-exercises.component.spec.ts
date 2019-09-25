import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExercisesComponent } from './upload-exercises.component';

describe('SubirejercicioComponent', () => {
  let component: UploadExercisesComponent;
  let fixture: ComponentFixture<UploadExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
