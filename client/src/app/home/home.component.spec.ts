import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
//import {routing} from "./app.routes";

describe('Home', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let playDe: DebugElement;
    let playEl: HTMLElement;
    let cardDe: DebugElement;
    let cardEl: HTMLElement;
    let deckDe: DebugElement;
    let deckEl: HTMLElement;
    let settingDe: DebugElement;
    let settingEl: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations:[HomeComponent],

            // declare the test component
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        })

        fixture = TestBed.createComponent(HomeComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('#logo'));
        el = de.nativeElement;

        playDe = fixture.debugElement.query(By.css("#play-button"));
        playEl = playDe.nativeElement;

        cardDe = fixture.debugElement.query(By.css("#card-button"));
        cardEl = cardDe.nativeElement;

        deckDe = fixture.debugElement.query(By.css("#deck-button"));
        deckEl = deckDe.nativeElement;

        settingDe = fixture.debugElement.query(By.css("#setting-button"));
        settingEl = settingDe.nativeElement;

    });

    /*
    Test various buttons on the homePage
     */
    it("contains 'I Am Sage logo'", () => {
        fixture.detectChanges();
        expect(el.textContent).toContain("Sage");
    });

    it("contains play button", () => {
        fixture.detectChanges();
        expect(playEl.textContent).toContain("Play");
    });

    it("contains card button", () => {
        fixture.detectChanges();
        expect(cardEl.textContent).toContain("Card");
    });

    it("contains deck button", () => {
        fixture.detectChanges();
        expect(deckEl.textContent).toContain("Deck");
    });

    it("contains setting button", () => {
        fixture.detectChanges();
        expect(settingEl.textContent).toContain("Setting");
    });
});
