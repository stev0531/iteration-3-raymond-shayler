import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {CardState} from "./CardState";
import {MdDialog} from "@angular/material";
import {ResultsComponent} from "../results/results.component";
import {MatDialogConfig} from "@angular/material";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";
import {environment} from "../../environments/environment";
import {Card} from "../card/card";



@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

    deckPlus: string;
    deckid: string;
    private cardLimit: number;

    deck: Deck;

    public pageNumber: number = 0;
    public cardsDone: number = 0;

    public playerPoints = [0];
    public playerColor = [];
    public player = 0;

    public points1: number = 0;
    public points2: number = 0;

    public cardStates: CardState[];

    constructor(public deckService: DeckService, private route: ActivatedRoute, public peek: MdDialog, public results: MdDialog) {
        this.cardStates = [];
    }


    public addPoints(pageNumber: number): void {

        if (this.cardStates[pageNumber].isComplete == false && pageNumber < this.deck.cards.length) {
            this.playerPoints[this.player] += this.cardStates[pageNumber].cardPoints;
            this.player++;


            if(this.player >= this.playerPoints.length){
                this.player = 0;
            }

            this.cardStates[pageNumber].selected = 0;
            this.cardStates[pageNumber].isDone();
            this.cardsDone = this.cardsDone + 1;
            this.pageNumber = pageNumber + 1;

        }

        if(this.cardsDone == (this.deck.cards.length)){
            this.openResultsDialog();
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

        let cardRef = this.peek.open(CardDisplayDialogComponent, config);
    };

    public openResultsDialog() {
        let config = new MatDialogConfig();
        config.data = {
            points1: this.points1,
            points2: this.points2,
            deck: this.deck
        };
        config.disableClose = true;

        let cardRef = this.results.open(ResultsComponent, config);
    };

    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976

    public shuffle(array) {
        let currentIndex = array.length;
        let  temporaryValue: number;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.deckPlus = params['deck'];

            if(this.deckPlus != null){
                let splitStr = this.deckPlus.split("_");
                this.deckid = splitStr[0];
                this.cardLimit = Math.abs(+splitStr[1]);
                let numOfPlayers = Math.abs(+splitStr[2]);
                let i=0;
                for(i; i<numOfPlayers-1;i++){
                    this.playerPoints.push(0);
                }

                for(i=3; i<splitStr.length; i++){
                    this.playerColor.push(splitStr[i]);
                }

            }

            this.deckService.getDeck(this.deckid).subscribe(
                deck => {
                    this.deck = deck;
                    if (environment.envName == "prod") {
                        this.deck.cards = this.shuffle(this.deck.cards);
                    }

                    if(this.cardLimit>this.deck.cards.length){
                        this.cardLimit = this.deck.cards.length;
                    }

                    this.deck.cards.splice(0, (this.deck.cards.length - this.cardLimit));
                }
            );


        });
    }

}
