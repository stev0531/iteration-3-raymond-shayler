import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectColorComponent } from './select-color.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared.module";
import {ActivatedRoute} from "@angular/router";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

describe('SelectColorComponent', () => {
  let component: SelectColorComponent;
  let fixture: ComponentFixture<SelectColorComponent>;

  beforeEach(async(() => {

      TestBed.configureTestingModule({
          imports: [SharedModule, CommonModule, RouterTestingModule],
          declarations: [SelectColorComponent],
          providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
              {
                  provide: ActivatedRoute,
                  useValue: {
                      params: Observable.of({id:"test id"})
                  }
              }],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
