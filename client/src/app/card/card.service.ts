import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Card} from "./card";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class CardService {

    constructor(private http: Http) {
    }

    public cards: Card[];
    private cardUrl: string = environment.API_URL + "cards";

    public getCards(): void {
        this.http.request(this.cardUrl, {withCredentials: true}).map(res => res.json()).subscribe(
            cardsres => {
                this.cards = cardsres;
                console.log("Returned some decks")
            }, err => {
                console.log(err);
            }
        );
    }
}
