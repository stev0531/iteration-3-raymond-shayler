import {Component, OnInit} from '@angular/core';
import {SimpleCardService} from "../simple-card/simple-card.service";
import {ActivatedRoute} from "@angular/router";
import {SimpleCard} from "../simple-card/simple-card";


@Component({
    selector: 'app-simple-card-list',
    templateUrl: './simple-card.component.html',
    styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {

    id : string;
    simpleCard: SimpleCard;
    word : string;


    constructor(public SimpleCardService : SimpleCardService, private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.SimpleCardService.getSimpleCard(this.id).subscribe(
                simpleCard => {
                    this.simpleCard = simpleCard;
                    this.word = simpleCard.word;
                }
            );
        });
    }


}
