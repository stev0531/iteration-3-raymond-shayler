import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeckComponent} from './deck.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {CardComponent} from "../card-component/card.component";
import {DeckService} from "../deck/deck.service";
import {Observable} from "rxjs";
import {Deck} from "../deck/deck";
import {ActivatedRoute} from "@angular/router";

describe('DeckComponent', () => {
    let component: DeckComponent;
    let fixture: ComponentFixture<DeckComponent>;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>
        updateName: (newName, id) => Observable<any>
    };

    beforeEach(async(() => {

        deckServiceStub = {
            updateName: (newName: string, id: object) => Observable.of([]),
            getDeck: (id) => Observable.of({
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
            imports: [SharedModule],
            declarations: [DeckComponent, CardComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService, useValue: deckServiceStub}, {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    }
                }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load a deck', () => {

        expect(component.deck).toEqual({
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
        });
    })

    it('Should enter edit mode when the edit button is clicked', () => {
        component.changeMode();
        expect(component.editMode).toEqual(true);
    });

    it('Should exit edit mode when the chancel button is clicked', () => {
        component.changeMode();
        component.cancelEdit();
        expect(component.editMode).toEqual(false);
    });

    it('Should set the deck name to be the new deck name when Save Changes is pressed', () => {
        component.changeMode();
        component.newDeckTitle = "Florida";
        component.saveEdit();
        expect(component.editMode).toEqual(false);
        expect(component.deck.name).toEqual("Florida");
    });

});
