import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Classroom} from "./classroom";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class ClassroomService {

    constructor(private http: Http) {
    }

    public classrooms: Classroom[];

    private classroomUrl: string = environment.API_URL + "classrooms";

    public getClassrooms(): void {
        this.http.request(this.classroomUrl).map(res => res.json()).subscribe(
            classres => {
                this.classrooms = classres;
            }, err => {
                console.log(err);
            }
        );
    }

    public getClassroom(id: string): Observable<Classroom> {
        let newClassroom: Observable<Classroom> = this.http.request(this.classroomUrl + "/" + id).map(res => res.json());
        return newClassroom;
    }
}
