import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent implements OnInit {

  public color: string;
  public deckPlus: string;
  public numOfPlayers: number;
  public player = 1;

  constructor(private route: ActivatedRoute) { }

    select(color) {
        this.deckPlus = this.deckPlus + '_' + color;
        this.player++;
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.deckPlus = params['info'];
          if(this.deckPlus != null){
              let splitStr = this.deckPlus.split("_", 3);
              this.numOfPlayers = Math.abs(+splitStr[2]);
          }

      });
  }

}
