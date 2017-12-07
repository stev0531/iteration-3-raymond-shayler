import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from "../shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {TeacherZoneComponent} from "./teacher-zone.component";

describe('TeacherZoneComponent', () => {
    let component: TeacherZoneComponent;
    let fixture: ComponentFixture<TeacherZoneComponent>;
    let de: DebugElement;
    let el: HTMLElement;


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [TeacherZoneComponent], providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

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

    it('should have a title', () => {
        de = fixture.debugElement.query(By.css('.faq-title'));
        el = de.nativeElement;
        expect(el.textContent).toContain("SAGE Vocabulary: Teacher's Guide");
    });

    it("should have the right answers", () => {
        de = fixture.debugElement.query(By.css('.section-signIn'));
        el = de.nativeElement;
        expect(el.textContent).toContain("sign in");

        de = fixture.debugElement.query(By.css('.section-createDecks'));
        el = de.nativeElement;
        expect(el.textContent).toContain("create decks");

        de = fixture.debugElement.query(By.css('.section-addCards'));
        el = de.nativeElement;
        expect(el.textContent).toContain("add cards");

        de = fixture.debugElement.query(By.css('.section-createCards'));
        el = de.nativeElement;
        expect(el.textContent).toContain("create cards");

        de = fixture.debugElement.query(By.css('.section-addEmail'));
        el = de.nativeElement;
        expect(el.textContent).toContain("email account");

        de = fixture.debugElement.query(By.css('.section-signInBroken'));
        el = de.nativeElement;
        expect(el.textContent).toContain("signed in");

        de = fixture.debugElement.query(By.css('.section-noAccess'));
        el = de.nativeElement;
        expect(el.textContent).toContain("I am a teacher");
    })
});
