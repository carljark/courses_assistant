import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphbarComponent } from './graphbar.component';

describe('GraphbarComponent', () => {
  let component: GraphbarComponent;
  let fixture: ComponentFixture<GraphbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
