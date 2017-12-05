import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherZoneComponent } from './teacher-zone.component';

describe('TeacherZoneComponent', () => {
  let component: TeacherZoneComponent;
  let fixture: ComponentFixture<TeacherZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
