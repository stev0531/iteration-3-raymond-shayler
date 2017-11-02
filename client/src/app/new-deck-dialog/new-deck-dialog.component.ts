import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
    selector: 'app-new-deck-dialog',
    templateUrl: './new-deck-dialog.component.html',
    styleUrls: ['./new-deck-dialog.component.css']
})
export class NewDeckDialogComponent implements OnInit {

    constructor(public deckService: DeckService,
                public matDialogRef: MatDialogRef<NewDeckDialogComponent>,
                public snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    newDeckName: string;

    public addNewDeck(): void {
        this.deckService.addNewDeck(this.newDeckName).subscribe(
            succeeded => {
                this.deckService.decks.push(succeeded);
                this.matDialogRef.close();
                let config = new MatSnackBarConfig();
                config.duration = 2000;
                this.snackBar.open("Added deck", null, config);
            }, err => {
                console.log(err);
                let config = new MatSnackBarConfig();
                config.duration = 2000;
                this.snackBar.open("Error adding deck", null, config);
            }
        )
    }

}
