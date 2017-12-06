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
                public data: { points1: number, points2: number, points3: number, points4: number, deck: Deck }) {
    }


    score1: number;
    score2: number;
    score3: number;
    score4: number;
    deck: Deck;

    public close(){
        this.matDialogRef.close();
    }


    ngOnInit() {
        this.score1 = this.data.points1;
        this.score2 = this.data.points2;
        this.score3 = this.data.points3;
        this.score4 = this.data.points4;
        this.deck = this.data.deck;

    }
}
