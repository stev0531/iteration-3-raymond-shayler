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
}

