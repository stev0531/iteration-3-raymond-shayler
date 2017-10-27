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

  @Input() showSynonym?: boolean = false;
  @Input() showAntonym?: boolean = false;
  @Input() showGeneral_sense?: boolean = false;
  @Input() showExample_usage?: boolean = false;

  ngOnInit() {
  }


}
