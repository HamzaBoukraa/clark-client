import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningObjectStructureComponent } from './learning-object-structure.component';

describe('LearningObjectStructureComponent', () => {
  let component: LearningObjectStructureComponent;
  let fixture: ComponentFixture<LearningObjectStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningObjectStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningObjectStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
