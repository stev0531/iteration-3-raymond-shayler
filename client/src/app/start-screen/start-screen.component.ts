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
    public players = [2,3,4];
    public numOfplayers: number;
    public color: string;

    constructor(public deckService: DeckService) {

    }

    selectDeck(deck) {

        this.deck = deck;
        console.log(this.deck);
        this.limit = new FormControl('', [Validators.min(1)]);
    }

    selectNumOfPlayers(num) {
        this.numOfplayers = num;
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
            '';
    }

    setDeckUrl(): string {
        return this.deck._id.$oid + '_' + this.limit.value + '_' + this.numOfplayers;
    }

    ngOnInit(): void {
        this.deckService.getDecks();
    }


}
