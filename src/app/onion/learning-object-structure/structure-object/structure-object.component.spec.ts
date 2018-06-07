import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureObjectComponent } from './structure-object.component';

describe('StructureObjectComponent', () => {
  let component: StructureObjectComponent;
  let fixture: ComponentFixture<StructureObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
