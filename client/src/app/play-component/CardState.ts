

export class CardState {
    public cardPoints: number;
    public cardHints: number[];
    public isComplete: boolean;
    public selected: number;

    public showHints: boolean[];

    constructor() {
        this.cardPoints = 5;
        this.cardHints = [1, 2, 3, 4];
        this.isComplete = false;
        this.selected = 0;

        this.showHints = [false, false, false, false];
    }

    public randomizeSages(): void {
        if (this.cardHints.length > 0 && !this.isComplete) {


            let randNum = Math.floor(Math.random() * this.cardHints.length);
            this.selected = this.cardHints[randNum];
            this.showHints[this.selected - 1] = true;

            this.cardHints.splice(randNum, 1);
            this.cardPoints = this.cardPoints - 1;

        }


    }


    public isDone(): void {
        this.isComplete = true;
    }


}
