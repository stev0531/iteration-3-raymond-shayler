import {Card} from "../card/card";

export interface Deck {
    _id: {
        $oid: string
    },
    name: string,
    //count: number
    cards: Card[]

}
