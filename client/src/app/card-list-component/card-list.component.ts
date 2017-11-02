import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CardListService} from "./card-list.service";
import {Card} from "../card/card";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";
import {MatDialogConfig} from "@angular/material";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";
import {MdDialog} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {Deck} from "../deck/deck";
import {SimpleCard} from "../simple-card/simple-card";
import {SimpleDeck} from "../simple-deck/simple-deck";
import {CardService} from "../card/card.service";

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})


@ViewChild(SimpleCardComponent)

export class CardListComponent implements OnInit {
    public cards: SimpleCard[];
    public selectedCards: SimpleCard[];
    public selectedButton: String;
    public mode: String;
    public clearAllSelected: boolean;
    public decks: SimpleDeck[];
    public selectedDeck: SimpleDeck;


    selectDeck(deck) {
        this.selectedDeck = deck;
        console.log("YAY");
        console.log(this.selectedDeck);
    }

    select(card) {
        if (this.mode == "View") {
            this.openCardDisplay(card);
        } else {
            if (card.selected == true) {
                this.selectedCards.splice(this.selectedCards.indexOf(card), 1);
                card.selected = false;
            } else {
                card.selected = true;
                this.selectedCards.push(card);
            }
        }
        console.log(this.selectedCards.length);
    }

    clearSelected(card){
        card.selected = false;
    }

    public openCardDisplay(card) {
        let config = new MatDialogConfig();
        // let presentCard = card;
        let presentCard: Card = card;
            this.CardListService.getCard(card._id["$oid"]).subscribe(
            newCard => {
                presentCard = newCard
                console.log(presentCard);
                config.data = {
                    Word: presentCard.word,
                    Synonym: presentCard.synonym,
                    Antonym: presentCard.antonym,
                    General_sense: presentCard.general_sense,
                    Example_usage: presentCard.example_usage,
                };
                console.log(config);

            let cardRef = this.peek.open(CardDisplayDialogComponent, config);
            }
        );

       // cardRef.setEditShown(true);
    };

    public modeHandler(){
        if (this.selectedButton == null) {
            this.mode = "View";
        } else if (this.selectedButton == "select") {
            this.mode = "Select";
        } else {
            this.mode = "View";
        }
        if (this.mode == "View") {
            this.clearAllSelected = true;
            this.selectedCards.length = 0;
        } else {
            this.clearAllSelected = false;
        }
    }

    public changeButton(button) {
        if (this.selectedButton == button) {
            this.selectedButton = null;
        } else {
            this.selectedButton = button;
        }
        this.modeHandler();
    }


    constructor(public CardListService: CardListService, public DeckService: DeckService, public peek: MdDialog) {
        this.mode = "View";
        this.selectedCards = [];
    }

    addCards(){
        let cardIds: string[] = [];
        if (this.selectedCards.length > 0) {
            for (var i = 0; i < this.selectedCards.length; i++) {
                cardIds[i] = this.selectedCards[i]._id["$oid"];
            }
        }
        this.CardListService.addCardsToDeck(this.selectedDeck, cardIds);

    }

    ngOnInit(): void {
        this.CardListService.getSimpleCards().subscribe(
            cards => {
                this.cards = cards;
            },
            err => {
                console.log(err);
            }
        );
        this.DeckService.getSimpleDecks().subscribe(
            decks => {
                this.decks = decks;
            },
            err => {
                console.log(err);
            }
        );
    }
}
