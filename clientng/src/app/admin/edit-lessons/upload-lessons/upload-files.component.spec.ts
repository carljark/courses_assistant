import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLessonsComponent } from './upload-files.component';

describe('SubirarchivoComponent', () => {
  let component: UploadLessonsComponent;
  let fixture: ComponentFixture<UploadLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
