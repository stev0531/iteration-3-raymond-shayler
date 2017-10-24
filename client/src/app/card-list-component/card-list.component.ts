import { Component, OnInit } from '@angular/core';
import {SimpleCardService} from "../simple-card/simple-card.service";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {SimpleCardComponent} from "../simple-card-component/simple-card.component";
import {SimpleCard} from "../simple-card/simple-card";

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

    constructor(public simpleCardService: SimpleCardService) { }

    ngOnInit() {
        this.simpleCardService.getSimpleCards();
    }

}

