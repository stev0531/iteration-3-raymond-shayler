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

   it('should select a color and store it as a player color and increment the player', () => {
      component.select('Purple');
      expect(component.player).toBe(2);
      expect(component.playerColors).toContain('Purple');
   });

   it('should select multiple colors in succession, store each of them, and increment the player accordingly', () => {
     component.select('Purple');
     component.select('Blue');
     component.select('Red');

     expect(component.player).toBe(4);
     expect(component.playerColors).toContain('Purple');
     expect(component.playerColors).toContain('Blue');
     expect(component.playerColors).toContain('Red');
   })
});
