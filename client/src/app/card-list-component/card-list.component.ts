import { Component, OnInit, ViewChild } from '@angular/core';
import {CardListService} from "./card-list.service";
import {Card} from "../card/card";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";

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
        if (card.selected == true) {
            card.selected = false;

        } else {
            card.selected = true;
        }
    }


    constructor(public CardListService: CardListService) {
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
