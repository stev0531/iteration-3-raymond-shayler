import {Component, Input, OnInit, Inject} from '@angular/core';
import {Card} from "../card/card";
import {MatDialogConfig, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-card',
  templateUrl: './card-display-dialog.component.html',
  styleUrls: ['./card-display-dialog.component.css']
})
export class CardDisplayDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<CardDisplayDialogComponent>,
              @Inject (MAT_DIALOG_DATA)
                public data: {synonym: string, antonym: string, general_sense: string, example_usage: string},
                public snackBar: MatSnackBar)
             { }


    Word: string;
    Synonym: "Grope";
    Antonym: string;
    General_sense: string;
    Example_usage: string;

  @Input() card: Card;

  ngOnInit() {

  }

}
