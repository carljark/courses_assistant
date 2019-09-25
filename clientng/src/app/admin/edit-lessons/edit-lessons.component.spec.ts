import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddimgstobdComponent } from './edit-lessons.component';

describe('AddimgstobdComponent', () => {
  let component: AddimgstobdComponent;
  let fixture: ComponentFixture<AddimgstobdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddimgstobdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddimgstobdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
