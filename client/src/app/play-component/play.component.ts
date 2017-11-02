import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {CardState} from "./CardState";
import {MdDialog} from "@angular/material";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {CardComponent} from "../card-component/card.component";
import {MatDialogConfig} from "@angular/material";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";


@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

    deckid: string;

    deck: Deck;

    public pageNumber: number = 0;
    public pageCount: number = 0;

    public points: number = 0;

    public cardStates: CardState[];

    constructor(public deckService: DeckService, private route: ActivatedRoute, public peek: MdDialog) {
        this.cardStates = [];
    }


    public addPoints(pageNumber: number): void {

        if (this.cardStates[pageNumber].isComplete == false && pageNumber < this.deck.cards.length) {
            this.points += this.cardStates[pageNumber].cardPoints;
            this.cardStates[pageNumber].selected = 0;
            this.cardStates[pageNumber].isDone();
            this.pageNumber = pageNumber + 1;

        }

    }

    public getCardState(i: number): CardState {
        if (this.cardStates[i] == null) {
            this.cardStates[i] = new CardState;
        }
        return this.cardStates[i];
    }

    public openPeekDialog() {
        let config = new MatDialogConfig();
        let presentCard = this.deck.cards[this.pageNumber];
        config.data = {
            Word: presentCard.word,
            Synonym: presentCard.synonym,
            Antonym: presentCard.antonym,
            General_sense: presentCard.general_sense,
            Example_usage: presentCard.example_usage
        };
        console.log(config);

        let cardRef = this.peek.open(CardDisplayDialogComponent, config);
    };


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.deckid = params['deck'];

            this.deckService.getDeck(this.deckid).subscribe(
                deck => {
                    this.deck = deck;
                }
            );
        });
    }

}
