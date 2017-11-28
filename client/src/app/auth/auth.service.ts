import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http:Http) { }

    authorized() : Observable<boolean> {
        console.log("checking if I am logged in");
        return this.http.get("/api/" + "checkAuthorization", {withCredentials: true}).map(res => res.json().authorized);
    }


    login(){
        console.log("Start Login")
        this.http.request("/api/authorise")
    }
}
