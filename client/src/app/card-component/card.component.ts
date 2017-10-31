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
  @Input() showHints?: boolean[] = [true,true,true,true];//need to be true so when cards are displayed from the deck the hints show up


  ngOnInit() {

  }


}
