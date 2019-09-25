import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirejercicioComponent } from './subirejercicio.component';

describe('SubirejercicioComponent', () => {
  let component: SubirejercicioComponent;
  let fixture: ComponentFixture<SubirejercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirejercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
