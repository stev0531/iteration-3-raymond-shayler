import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SimpleCard} from "./simple-card";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class SimpleCardService {

    private cardUrl: string = environment.API_URL + "cards";

    constructor(private http: Http) {
    }

    public simpleCards: SimpleCard[];

    public getSimpleCards(): void {
        this.http.request(this.cardUrl, {withCredentials: true}).map(res => res.json()).subscribe(
            cardsres => {
                this.simpleCards = cardsres;
            }, err => {
                console.log(err);
            }
        );
    }

    public getSimpleCard(id: string): Observable<SimpleCard> {
        let newSimpleCard: Observable<SimpleCard> = this.http.request(+"/" + id, {withCredentials:true}).map(res => res.json());
        return newSimpleCard;
    }
}
