import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {Deck} from "../deck/deck";


@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<ResultsComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: { points: number, deck: Deck }) {
    }


    score: number;
    deck: Deck;

    public close(){
        this.matDialogRef.close();
    }


    ngOnInit() {
        this.score = this.data.points;
        this.deck = this.data.deck;

    }
}
