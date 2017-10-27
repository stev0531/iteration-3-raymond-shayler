import {CardComponent} from "../card-component/card.component";


export class CardState {
    public cardPoints:number;
    public cardHints:number[];
    public isComplete: boolean;
    public selected: number;

    public showSynonym: boolean;
    public showAntonym: boolean;
    public showGeneral_sense: boolean;
    public showExample_usage: boolean;


    constructor(){
        this.cardPoints = 5;
        this.cardHints = [1,2,3,4];
        this.isComplete = false;
        this.selected = 0;

        this.showSynonym = false;
        this.showAntonym = false;
        this.showGeneral_sense = false;
        this.showExample_usage = false;
    }

    public randomizeSages(): void{
        if(this.cardHints.length > 0 && !this.isComplete) {

            this.showSynonym = true;
            this.showAntonym = true;

            let randNum = Math.floor(Math.random() * this.cardHints.length);
            this.selected = this.cardHints[randNum];

            this.cardHints.splice(randNum, 1);
            this.cardPoints = this.cardPoints - 1;

        }


    }


    public isDone(): void {
        this.isComplete = true;
    }


}
