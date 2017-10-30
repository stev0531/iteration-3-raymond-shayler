import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
    public clearAllSelected: boolean;



    updateMode(event){
        console.log(event);
        this.mode = event.value;
        if (this.mode == "View") {
            this.clearAllSelected = true;
            this.selectedCards.length = 0;
        } else {
            this.clearAllSelected = false;
        }
    }

    select(card) {
        if (this.mode == "View") {
            this.openCardDisplay(card);
        } else {
            if (card.selected == true) {
                this.selectedCards.splice(this.selectedCards.indexOf(card), 1);
                card.selected = false;
            } else {
                card.selected = true;
                this.selectedCards.push(card);
            }
        }
      //  console.log(this.selectedCards[0].word);
        console.log(this.selectedCards.length);
    }

    clearSelected(card){
        card.selected = false;
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
        if (this.mode == "View") {
            this.clearAllSelected = true;
            this.selectedCards.length = 0;
        } else {
            this.clearAllSelected = false;
        }
    }

    public changeButton(button) {
        if (this.selectedButton == button) {
            this.selectedButton = null;
        } else {
            this.selectedButton = button;
        }
        this.modeHandler();
    }


    constructor(public CardListService: CardListService,public peek: MdDialog) {
        this.mode = "View";
        this.selectedCards = [];
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
