import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CardListService} from "./card-list.service";
import {Card} from "../card/card";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";
import {MatDialogConfig} from "@angular/material";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";
import {MdDialog} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {SimpleCard} from "../simple-card/simple-card";
import {SimpleDeck} from "../simple-deck/simple-deck";
import {DeckChangesDialogComponent} from "../deck-changes-dialog/deck-changes-dialog";

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})

/*
The cardList component has numerous instance variables. The cards to be displayed in the view are actually
"SimpleCards" which only include the word of a card and its ID, and not hints associated with the full card.
The mode of the card list can be either "View" or "Select". When clicking a card in view mode, a request to
the server will be made for all of the information in that card, and will display it in a popup dialog.
When a card is pressed in select mode, it will be highlighted and placed into the selectedCards array.
The card list also retrieves the names and ids of all of the decks in the system as SimpleDecks. clearAllSelected
will indicate in a for loop to all of the simpleCard components displayed on the screen that they should set
their selected variable to false. The selectedDeck variable will give the server a target to add or remove
cards from. selectedCards are also passed to the server to indicate which cards should be
added or removed from a deck. The selectedButton variable lets the component distinguish between when it is in select or view mode based
on what the last button pressed was. Finally, cardWords are kept track of separately so that they can be shown
on a dialog for what changes have been made to a deck.
 */

@ViewChild(SimpleCardComponent)

export class CardListComponent implements OnInit {
    public cards: SimpleCard[];
    public selectedCards: SimpleCard[];
    public selectedButton: string;
    public mode: String;
    public clearAllSelected: boolean;
    public decks: SimpleDeck[];
    public selectedDeck: SimpleDeck;
    public cardRef: any;
    public cardWords: string[] = [];


    /*
    Creates the cardList component with a cardList service, DeckService, and MdDialog. The component
    will be initialized in view mode, with an empty array of selected cards. Additionally, after all
    dialogs have closed the page will be refreshed by retrieving the most recent simpleCards.
     */
    constructor(public CardListService: CardListService, public DeckService: DeckService, public peek: MdDialog) {
        this.mode = "View";
        this.selectedCards = [];
        peek.afterAllClosed.subscribe(() => {
            this.refreshPage();
        })
    }

    selectDeck(deck) {
        this.selectedDeck = deck;
    }

    /*
    If the mode is "View", a dialog with the full contents of that card will be displayed. Otherwise if
    the card has already been selected, it will be deselected and removed from the selected cards array.
    Otherwise it will selected and added to that array.
     */
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

    clearSelected(card) {
        card.selected = false;
    }

    /*
    Opens a display with the full content of that card. Sends a request to the server
    for this information, and populates the config with this information, and sends it to
    the dialog component to be created.
     */
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
                    deleteShown: true,
                    cardId: presentCard._id
                };

                let cardRef = this.peek.open(CardDisplayDialogComponent, config);
            }
        );

    };

    /*
    Creates the deckChanges Dialog. Will change the wording of the dialog depending on if
    cards are being added or removed from the deck. The server is not consulted before the
    creation of this dialog, the information is just sent to the constuctor for the dialog.
     */
    public openDeckChangesDisplay(button: string) {
        let config = new MatDialogConfig();
        let changeType: string = "";
        let cards: string[] = this.cardWords;
        if (button == 'add') {
            changeType = 'added to';
        } else {
            changeType = 'removed from';
        }

        config.data = {
            deck: this.selectedDeck,
            cards: cards,
            typeOfChange: changeType
        };
        console.log(config);
        let cardRef = this.peek.open(DeckChangesDialogComponent, config);
        this.cardRef = cardRef;
            cardRef.afterClosed().subscribe(result => {
        });
    }


    //Changes the mode of the component and will make changes to instance variables accordingly
    public modeHandler() {
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

    /*
    Method that makes additions or deletions of cards to decks. Takes a button which is assumed to be an adding or
    deleting button. Will configure the list of card ids and type of request to send to the service, and prepare
    the card word array for the dialog. After this, it will clear all of the selected cards.
    */
    changeDeck(button: string) {
        let cardIds: string[] = [];
        if (this.selectedCards.length > 0) {
            for (var i = 0; i < this.selectedCards.length; i++) {
                cardIds[i] = this.selectedCards[i]._id["$oid"];
                this.cardWords[i] = this.selectedCards[i].word;
            }
        }
        if (button == 'add') {
            this.CardListService.addCardsToDeck(this.selectedDeck, cardIds);
            this.openDeckChangesDisplay(button);
        }
        else {
            this.CardListService.deleteCardsFromDeck(this.selectedDeck, cardIds);
            this.openDeckChangesDisplay(button);
        }
        this.clearAllSelected = true;
        this.mode = "View";
        this.selectedCards.length = 0;
        this.selectedButton = 'Select';
    }


    //Retrieves another set of simple cards from the database. Will also make sure they are sorted.
    refreshPage() {
        this.CardListService.getSimpleCards().subscribe(
            cards => {
                this.cards = cards;
                this.sortCards();
            }
        )
    }

    //Sorts the SimpleCards by their word property using a comparison anonymous function. Ignores casing.
    sortCards() {
        this.cards.sort((n1, n2) => {
           if (n1.word.toLowerCase() > n2.word.toLowerCase()){
               return 1;
           }
           if (n1.word.toLowerCase() < n2.word.toLowerCase()){
               return -1;
           }
           return 0;
        });
    }

    ngOnInit(): void {
        this.CardListService.getSimpleCards().subscribe(
            cards => {
                this.cards = cards;
                this.sortCards();
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
