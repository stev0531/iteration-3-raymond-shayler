import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { CardComponent } from './card.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {Component} from "@angular/core";
import {Card} from "../card/card";
import {browser} from "protractor";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let debugElement: DebugElement;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [ TestComponentWrapper, CardComponent ],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the card', () => {
    expect(component).toBeTruthy();
  });

    it('should check that card fields are correct', () => {
        expect(component.card.synonym).toContain("test synonym");
        expect(component.card.antonym).toContain("test antonym");
        expect(component.card.general_sense).toContain("test general_sense");
        expect(component.card.example_usage).toContain("test example_usage");
    });

     it('should highlight hints correctly', () => {
         let synonym: HTMLElement = debugElement.query(By.css('.card-synonym')).nativeElement;
         expect(synonym.classList).toContain("hint-selected");

         let antonym: HTMLElement = debugElement.query(By.css('.card-antonym')).nativeElement;
         expect(antonym.classList).not.toContain("hint-selected");

         let general_sense: HTMLElement = debugElement.query(By.css('.card-general-sense')).nativeElement;
         expect(general_sense.classList).not.toContain("hint-selected");

         let example_usage: HTMLElement = debugElement.query(By.css('.card-example-usage')).nativeElement;
         expect(example_usage.classList).not.toContain("hint-selected");
     });

     it('should display shown hints correctly', () =>{
         let synonymCont: HTMLElement = debugElement.query(By.css('.synonym-cont')).nativeElement;
         expect(synonymCont.classList).toContain("show-hint");

         let antonymCont: HTMLElement = debugElement.query(By.css('.antonym-cont')).nativeElement;
         expect(antonymCont.classList).toContain("show-hint");

         let generalSenseCont: HTMLElement = debugElement.query(By.css('.general-sense-cont')).nativeElement;
         expect(generalSenseCont.classList).not.toContain("show-hint");

         let exampleUsageCont: HTMLElement = debugElement.query(By.css('.example-usage-cont')).nativeElement;
         expect(exampleUsageCont.classList).not.toContain("show-hint");
    })
});

@Component({
    selector: 'test-component-wrapper',
    template: '<app-card [card]="card" [selected]="1" [showHints]="[true,true,false,false]"></app-card>'
})
class TestComponentWrapper {
    card : Card = {
        _id : "test id",
        word : "test word",
        synonym : "test synonym",
        antonym: "test antonym",
        general_sense: "test general_sense",
        example_usage: "test example_usage",
    };
}
