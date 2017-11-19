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

    /*
        public deleteCardsFromDeck(ids: string[]) {
            let wipRequest: string = "";
            for (var i = 0; i < ids.length; i++) {
                wipRequest = wipRequest + ids[i].toString() + ",";
            }
            console.log("/del/" + wipRequest);
            let deleteRequest: Observable<any> = this.http.request("/del" + wipRequest);
        }
    */

    /*
        public addNewDeck(name: string) {
            let response = this.http.post(this.deckUrl + "/add", {name: name}).map(res => res.json());
            return response; */

    public addCardsToDeck(deck: SimpleDeck, ids: string[]) {
        console.log("Received adding cards request");
        let wipRequest: string = "";
        wipRequest += "?DeckID=" + deck._id["$oid"] + "&cardArray=";
        for (var i = 0; i < ids.length; i++) {
            console.log(ids[i]);
            wipRequest += ids[i];
            if (i < ids.length - 1) {
                wipRequest += "&cardArray=";
            }
        }
        console.log(this.cardUrl + "/multi" + wipRequest);
        // console.log(this.http.post(this.cardUrl +"/multi", wipRequest).map(res => res.json()));
        return this.http.post(this.cardUrl + "/multi", wipRequest, {withCredentials:true}).map(res => {
            console.log("processing response");
            console.log(res.json());
            res.json();
        });
    }
}

