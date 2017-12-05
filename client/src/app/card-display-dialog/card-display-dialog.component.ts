import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from "@angular/material";
import {DeleteCardDialogComponent} from "../delete-card-dialog/delete-card-dialog";
import {MdDialog} from "@angular/material";


@Component({
    selector: 'app-card-display-dialog',
    templateUrl: './card-display-dialog.component.html',
    styleUrls: ['./card-display-dialog.component.css']
})
export class CardDisplayDialogComponent implements OnInit {

    constructor(public dialog: MdDialog, public matDialogRef: MatDialogRef<CardDisplayDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: { Word: string, Synonym: string, Antonym: string, General_sense: string, Example_usage: string, deleteShown: boolean, cardId: object }) {
    }


    Word: string;
    Synonym: string;
    Antonym: string;
    General_sense: string;
    Example_usage: string;
    deleteShown: boolean;
    cardRef: any;
    cardId: object;

    // @Input() card: Card;

    deleteCard() {
        console.log(this.cardId);
        this.openDeleteCardDialog();
    }

    public openDeleteCardDialog() {
        let config = new MatDialogConfig();
        let cardWord: string = this.Word;
        let cardId: object = this.cardId;

        config.data = {
            cardId: cardId,
            cardWord: cardWord
        };
        console.log(config);
        let cardRef = this.dialog.open(DeleteCardDialogComponent, config);
        this.cardRef = cardRef;
        cardRef.afterClosed().subscribe(result => {
            // this.selectedCards.length = 0;
            // this.selectedButton = "Select";
        });
    }

    ngOnInit() {
        this.Word = this.data.Word;
        this.Synonym = this.data.Synonym;
        this.Antonym = this.data.Antonym;
        this.General_sense = this.data.General_sense;
        this.Example_usage = this.data.Example_usage;
        this.deleteShown = this.data.deleteShown;
        this.cardId = this.data.cardId;
        console.log(this.data);
        console.log(this.Word);

    }

    closeDialog(){
        this.matDialogRef.close();
    }

    setDeleteShown(value: boolean) {
        this.deleteShown = value;
    }
}
