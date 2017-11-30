import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {Deck} from "../deck/deck";
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-start',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
    public deck: Deck;
    public limit: FormControl;
    public players = [1,2,3,4];
    public numOfplayers: number;
    public colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    public color: string;

    constructor(public deckService: DeckService) {

    }

    selectDeck(deck) {
        console.log("In selectDeck");
        console.log(this.deckService.decks);
        console.log(deck);
        this.deck = deck;
        console.log(this.deck);
        this.limit = new FormControl('', [Validators.min(1), Validators.max(30)]);
    }

    selectNumOfPlayers(num) {
        this.numOfplayers = num;
    }

    selectColor(colour) {
        this.color = colour;
    }


    // sizeOfSelectedDeck() {
    //     console.log("In sizeOfSelectedDeck");
    //     console.log(this.deck);
    //     //console.log(this.deck.count);
    //     console.log(this.deckService.decks);
    //     if (this.deck !== undefined) {
    //         return 7; // this.deck.count;
    //     } else {
    //         return 0;
    //     }
    // }

    getErrorMessage() {
        return this.limit.hasError('min') ? 'The number picked is too low, pick a bigger number' :
            this.limit.hasError('max') ? 'The number picked is too big, pick a smaller number' :
            '';
    }

    setDeckUrl(): string {
        return this.deck._id.$oid + '_' + this.limit.value + '_' + this.numOfplayers;
    }

    ngOnInit(): void {
        this.deckService.getDecks();
    }


}
