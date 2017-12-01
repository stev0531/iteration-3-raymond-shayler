import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {CardService} from "../card/card.service";
import {Router} from "@angular/router";
import {CardListService} from "../card-list-component/card-list.service";
import {Output} from "@angular/core";

@Component({
    selector: 'app-delete-card-dialog',
    templateUrl: './delete-card-dialog.html',
    styleUrls: ['./delete-card-dialog.css']
})
export class DeleteCardDialogComponent implements OnInit {

    constructor(public cardListService: CardListService, public router: Router, public CardService: CardService, public matDialogRef: MatDialogRef<DeleteCardDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: {cardWord: string, cardId: object }) {
    }

    closeDialog(){
        this.matDialogRef.close();
    }

    deleteCard() {
        this.CardService.deleteCard(this.cardId).subscribe(
            response => {
                this.cardListService.getSimpleCards();
            }
        );
        this.closeDialog();
    }

    cardWord: string;
    cardId: object;

    ngOnInit() {
        this.cardWord = this.data.cardWord;
        this.cardId = this.data.cardId;
    }
}

