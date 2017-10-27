import { Component, OnInit, ViewChild } from '@angular/core';
import {CardListService} from "./card-list.service";
import {Card} from "../card/card";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";
import {MatDialogConfig} from "@angular/material";
import {CardDisplayDialogComponent} from "../card-display-dialog/card-display-dialog.component";
import {MdDialog} from "@angular/material";

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})


@ViewChild(SimpleCardComponent)

export class CardListComponent implements OnInit {
    public cards: Card[];
    public selectedCards: Card[];
    public selectedButton: String;
    public mode: String;

    select(card) {
        if (this.mode == "View") {
            this.openCardDisplay(card);
        } else {
            if (card.selected == true) {
                card.selected = false;

            } else {
                card.selected = true;
            }
        }
        console.log(this.mode);
        console.log(this.selectedButton);
    }

    public openCardDisplay(card) {
        let config = new MatDialogConfig();
        let presentCard = card;

        config.data = {
            Word: presentCard.word,
            Synonym: presentCard.synonym,
            Antonym: presentCard.antonym,
            General_sense: presentCard.general_sense,
            Example_usage: presentCard.example_usage,
        };
        console.log(config);

        let cardRef = this.peek.open(CardDisplayDialogComponent, config);
       // cardRef.setEditShown(true);
    };

    public modeHandler(){
        if (this.selectedButton == null) {
            this.mode = "View";
        } else if (this.selectedButton == "AddCards") {
            this.mode = "AddCards";
        } else if (this.selectedButton == "Delete") {
            this.mode = "Delete";
        } else {
            this.mode = "View";
        }
    }

    public changeButton(button) {
        if (this.selectedButton == button) {
            this.selectedButton = null;
            console.log(this.selectedButton);
        } else {
            this.selectedButton = button;
        }
        this.modeHandler();
    }


    constructor(public CardListService: CardListService,public peek: MdDialog) {
        this.mode = "View";
    }

    ngOnInit(): void {
        this.CardListService.getCards().subscribe(
            cards => {
                this.cards = cards;
            },
            err => {
                console.log(err);
            }
        );
    }
}
