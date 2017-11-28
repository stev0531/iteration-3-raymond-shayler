import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-delete-deck-dialog',
    templateUrl: './delete-deck-dialog.html',
    styleUrls: ['./delete-deck-dialog.css']
})
export class DeleteDeckDialogComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<DeleteDeckDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: { deckName: string }) {
    }

    closeDialog(){
        this.matDialogRef.close();
    }

    deckName: string;

    ngOnInit() {
        this.deckName = this.data.deckName;
    }
}

