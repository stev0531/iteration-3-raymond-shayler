export class SimpleCard {
   public _id: string
   public word: string
   public selected: boolean

    constructor(_id, word, selected) {
       this._id = _id;
       this.word = word;
       this.selected = selected;
    }
}
