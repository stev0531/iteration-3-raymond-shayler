import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {SimpleCard} from "../simple-card/simple-card";
import {SimpleDeck} from "../simple-deck/simple-deck";


@Component({
    selector: 'app-deck-changes-dialog',
    templateUrl: './deck-changes-dialog.html',
    styleUrls: ['./deck-changes-dialog.css']
})
export class DeckChangesDialogComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<DeckChangesDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: { deckName: string, cards: SimpleCard[], typeOfChange: string }) {
    }


    deckName: string;
    cards: SimpleCard[];
    typeOfChange: string;

    ngOnInit() {
        this.deckName = this.data.deckName;
        this.cards = this.data.cards;
        this.typeOfChange = this.data.typeOfChange;
    }
}

