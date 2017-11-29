import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-delete-deck-dialog',
    templateUrl: './delete-deck-dialog.html',
    styleUrls: ['./delete-deck-dialog.css']
})
export class DeleteDeckDialogComponent implements OnInit {

    constructor(public router: Router, public DeckService: DeckService, public matDialogRef: MatDialogRef<DeleteDeckDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: {deckName: string, deckId: object }) {
    }

    closeDialog(){
        this.matDialogRef.close();
    }

    deleteDeck() {
        this.DeckService.deleteDeck(this.deckId).subscribe(
            response => {
                this.router.navigate(["/decks"]);
            }
        );
        this.closeDialog();
    }

    deckName: string;
    deckId: object;

    ngOnInit() {
        this.deckName = this.data.deckName;
        this.deckId = this.data.deckId;
    }
}

