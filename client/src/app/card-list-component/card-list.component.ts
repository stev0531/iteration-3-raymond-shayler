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

    select(card) {
        this.openCardDisplay(card);
        // if (card.selected == true) {
        //     card.selected = false;
        //
        // } else {
        //     card.selected = true;
        // }
    }

    public openCardDisplay(card) {
        let config = new MatDialogConfig();
        let presentCard = card;

        config.data = {
            Word: presentCard.word,
            Synonym: presentCard.synonym,
            Antonym: presentCard.antonym,
            General_sense: presentCard.general_sense,
            Example_usage: presentCard.example_usage
        };
        console.log(config);

        let cardRef = this.peek.open(CardDisplayDialogComponent, config);
    };

    constructor(public CardListService: CardListService,public peek: MdDialog) {
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
