import {Component, OnInit} from '@angular/core';
import {PlayComponent} from "../play-component/play.component";
import {ActivatedRoute} from "@angular/router";
import {ResultsService} from "./results.service";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {

    public play: PlayComponent;


    constructor(){

    }

    ngOnInit() {

    }

}

