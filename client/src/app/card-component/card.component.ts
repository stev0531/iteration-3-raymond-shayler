import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {



  constructor() {
  }

  @Input() card: Card;

  @Input() selected?: number = 0;

  @Input() showSynonym: boolean;
  @Input() showAntonym: boolean;
  @Input() showGeneral_sense: boolean;
  @Input() showExample_usage: boolean;

  ngOnInit() {

  }


}
