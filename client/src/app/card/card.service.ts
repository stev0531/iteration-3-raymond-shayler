import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Card} from "./card";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class CardService {

    constructor(private http: Http) {
    }

    public cards: Card[];

    private cardUrl: string = environment.API_URL + "cards";


/*
    public getDeck(id:string) : Observable<Deck> {
        let newDeck : Observable<Deck> = this.http.request(this.deckUrl + "/" + id).map(res => res.json());
        return newDeck;
    }
    */

    public getCards(): void {
        this.http.request(this.cardUrl).map(res => res.json()).subscribe(
            cardsres => {
                this.cards = cardsres;
            }, err => {
                console.log(err);
            }
        );
    }
}
