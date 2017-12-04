import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent implements OnInit {

  public colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  public color: string;
  public deckPlus: string;
  public playerColors: string[];

  constructor(private route: ActivatedRoute) { }

    select(color) {
        this.color = color;
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.deckPlus = params['deck'];
          if (this.deckPlus != null) {
              let splitStr = this.deckPlus.split("_", 3);
              let numOfPlayers = Math.abs(+splitStr[2]);
              for (let i = 0; i < numOfPlayers - 1; i++) {
                  this.playerColors.push('null');
              }
          }
      });
  }

}
