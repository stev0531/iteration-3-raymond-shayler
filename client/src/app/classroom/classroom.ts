import {Card} from "../card/card";
import {Deck} from "../deck/deck";

export interface Classroom {
    _id: {
        $oid: string
    },
    name: string,
    decks: Deck[],
    cards: Card[]
}
