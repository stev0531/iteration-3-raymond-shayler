import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";
import {SimpleDeck} from "../simple-deck/simple-deck";

@Injectable()
export class CardListService {

    private cardUrl: string = environment.API_URL + "cards";

    constructor(private http: Http) {
    }


    getSimpleCards(): Observable<any> {

        let observable: Observable<any> = this.http.request(environment.API_URL + "/simple-cards", {withCredentials:true});
        return observable.map(res => res.json());
    }

    public getSimpleCard(id: string): Observable<Card> {
        let newSimpleCard: Observable<Card> = this.http.request(+"/" + id, {withCredentials: true}).map(res => res.json());
        return newSimpleCard;
    }

    public getCard(id: string): Observable<Card> {
        let newCard: Observable<Card> = this.http.request(this.cardUrl + "/" + id, {withCredentials: true}).map(res => res.json());
        return newCard;
    }

    public addCardsToDeck(deck: SimpleDeck, ids: Object[]) {
        console.log("Received adding cards request");
        let wipRequest = {
            deckId: deck._id["$oid"],
            cardIds: ids
        };
        console.log(wipRequest);
        console.log(environment.API_URL + "addMany");

        return this.http.post(environment.API_URL + "addMany", JSON.stringify(wipRequest), {withCredentials:true}).map(res => res.json()).subscribe();
    }

    public deleteCardsFromDeck(deck: SimpleDeck, ids: Object[]) {
        console.log("Received deleting cards request");
        let wipRequest = {
            deckId: deck._id["$oid"],
            cardIds: ids
        };
        console.log(wipRequest);
        console.log(environment.API_URL + "deleteMany");

        return this.http.post(environment.API_URL + "deleteMany", JSON.stringify(wipRequest), {withCredentials:true}).map(res => res.json()).subscribe();
    }
}

