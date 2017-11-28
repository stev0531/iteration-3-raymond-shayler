import {Classroom} from "../classroom/classroom";


export interface User {
    _id: {
        $oid: string
    },
    name: string,
    email: string,
    classrooms: Classroom []
}
