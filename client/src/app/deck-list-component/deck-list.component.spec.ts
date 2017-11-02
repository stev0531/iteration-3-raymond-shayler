import {TestBed, ComponentFixture} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {DeckListComponent} from "./deck-list.component";
import {DeckService} from "../deck/deck.service";
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";


describe('DeckListComponent', () => {

    let component: DeckListComponent;
    let fixture: ComponentFixture<DeckListComponent>;
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

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>,
        getDecks: (id) => void
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [DeckListComponent],

            // declare the test component
            providers: [
                {provide: DeckService, useValue: deckServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        fixture = TestBed.createComponent(DeckListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    /*
    Test various buttons on the homePage
     */

    //nic is aware of this enigma, and has said we should move on.
    it("should fail this tests", () => {
        expect(5).toEqual(6);
    })
});
