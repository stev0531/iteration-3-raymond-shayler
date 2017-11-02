import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core";


@Component({
    selector: 'simple-card',
    templateUrl: './simple-card.component.html',
    styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {

    @Input() word: string;
    @Input() _id: string;
    @Input() selected: boolean;


    constructor() {
    }

    //This is the old constructor that caused it to break
    /*
    constructor(public SimpleCardService : SimpleCardService, private route: ActivatedRoute) {

    }
*/


    ngOnInit() {
        this.selected = false;
    }

}
