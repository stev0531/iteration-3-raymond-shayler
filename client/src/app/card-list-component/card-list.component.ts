import { Component, OnInit } from '@angular/core';
import {CardListService} from "./card-list.service";
import {Card} from "../card/card";

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
    public cards: Card[];


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
