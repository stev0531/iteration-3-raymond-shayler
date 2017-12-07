import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {StartScreenComponent} from "./start-screen.component";
import {Observable} from "rxjs/Observable";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../deck/deck.service";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

describe('StartScreenComponent', () => {
    let component: StartScreenComponent;
    let fixture: ComponentFixture<StartScreenComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let deckServiceStub: {
        getDecks: () => Observable<any>
    };


    beforeEach(async(() => {

        deckServiceStub = {
            getDecks: () => Observable.of({
                _id: {
                    $oid: "test id"
                },
                name: "test deck",
                cards: [
                    {
                        _id: "test id",
                        word: "test word",
                        synonym: "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    }
                ]
            })
        };

        TestBed.configureTestingModule({
            imports: [SharedModule, CommonModule, RouterTestingModule, ReactiveFormsModule],
            declarations: [StartScreenComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    }
                },
                {provide: DeckService, useValue: deckServiceStub}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StartScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should have a selected deck if a deck is selected', () => {
        component.selectDeck("test id");
        expect(component.deck.name == "test id");
    });

    it('Should display a play button at any given time', () => {
        let de = fixture.debugElement.query(By.css('.play-buttons'));
        let el = de.nativeElement;

        expect(el).toBeTruthy();

    });
});
