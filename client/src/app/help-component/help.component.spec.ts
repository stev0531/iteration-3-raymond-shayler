import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HelpComponent} from './help.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;
    let de: DebugElement;
    let el: HTMLElement;


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [HelpComponent], providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a title', () => {
        de = fixture.debugElement.query(By.css('#help-title'));
        el = de.nativeElement;
        expect(el.textContent).toContain("Help & Rules");
    });

    it("should have four sections", ()=>{
        de = fixture.debugElement.query(By.css('.section-rules'));
        el = de.nativeElement;
        expect(el.textContent).toContain("How to Play")

        de = fixture.debugElement.query(By.css('.section-hints'));
        el = de.nativeElement;
        expect(el.textContent).toContain("Hints")

        de = fixture.debugElement.query(By.css('.section-decks'));
        el = de.nativeElement;
        expect(el.textContent).toContain("Decks")

        de = fixture.debugElement.query(By.css('.section-cards'));
        el = de.nativeElement;
        expect(el.textContent).toContain("Cards")
    })
});
