import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class CardListService {

    private cardUrl: string = environment.API_URL + "cards";

    constructor(private http: Http) {  }



    getCards(): Observable<Card[]> {

        let observable: Observable<any> = this.http.request(this.cardUrl);
        return observable.map(res => res.json());
    }

    public getSimpleCard(id:string) : Observable<Card> {
        let newSimpleCard : Observable<Card> = this.http.request( + "/" + id).map(res => res.json());
        return newSimpleCard;
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

    public addCardsToDeck(ids: string[]) {
        console.log("Received adding cards request");
        let wipRequest: string = "";
        for (var i = 0; i < ids.length; i++) {
            wipRequest = wipRequest + ids[i] + ",";
        }
        let addRequest = this.http.post(this.cardUrl +"/addMany", wipRequest).map(res => res.json());
        return addRequest;
    }
}

