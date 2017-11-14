import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {PlayComponent} from "../play-component/play.component";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ResultsService {

    constructor(private http: Http) {
    }

    private play: PlayComponent;

    private playUrl: string = environment.API_URL + "play";

    public getScore(): void {
        this.http.request(this.playUrl).map(res => res.json()).subscribe(
            playres => {
                this.play = playres;
            }, err => {
                console.log(err);
            }
        );
    }

}
