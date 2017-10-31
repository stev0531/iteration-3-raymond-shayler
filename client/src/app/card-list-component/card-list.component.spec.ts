import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import {NgModule} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {CardListService} from "./card-list.service";
import {ActivatedRoute} from "@angular/router";
import {SharedModule} from "../shared.module";
import {CardComponent} from "../card-component/card.component";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";
import {CardListComponent} from "./card-list.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DeckService} from "../deck/deck.service";


describe('CardListComponent', () => {
    let component: CardListComponent;
    let fixture: ComponentFixture<CardListComponent>;
    let cardList: CardListComponent;

    let cardServiceStub: {
        getCards: () => Observable<any>
    };

    beforeEach(async(() => {

        cardServiceStub = {
            getCards: () => Observable.of([
                    {   _id : "test id",
                        word : "test word",
                        synonym : "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    },

                    {   _id : "test id",
                        word : "test word",
                        synonym : "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    },

                    {   _id : "test id",
                        word : "test word",
                        synonym : "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    }
                ])
        };

        @NgModule({
            imports: [CommonModule],
            declarations: [CardDisplayDialogComponent],
            entryComponents: [
                CardDisplayDialogComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        class TestDialog {}


        TestBed.configureTestingModule({
            imports: [SharedModule, TestDialog, CommonModule],
            declarations: [ CardListComponent, CardComponent, SimpleCardComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: CardListService, useValue: cardServiceStub}, {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    }
                }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should have an array with all of the received cards', () => {
       expect(component.cards.length).toBe(3);
    });

    it('Will not put a card into the selected array if the mode is "View"', () => {
       component.select(component.cards[0]);
       expect(component.selectedCards.length).toBe(0);
    });

    it('Will put a card into the selected array if the mode is "AddCards"', () => {
        component.mode = "AddCards";
        component.select(component.cards[0]);
        expect(component.selectedCards.length).toBe(1);
    });

    it ('Will put a card into the selected array if the mode is "Delete"', () => {
        component.mode = "Delete";
        component.select(component.cards[0]);
        expect(component.selectedCards.length).toBe(1);
    });

    it ('Will deselect a card if it is selected twice', () => {
       component.mode = "AddCards";
       component.select(component.cards[0]);
       component.select(component.cards[0]);
       expect(component.selectedCards.length).toBe(0);
    });
    it ('Will deselect all cards if the mode is changed to view', () => {
        component.mode = "AddCards";
        component.select(component.cards[0]);
        component.select(component.cards[1]);
        component.select(component.cards[2]);
        component.changeButton("New Card")
        expect(component.selectedCards.length).toBe(0);
    });


});
