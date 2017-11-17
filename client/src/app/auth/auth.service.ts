import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http:Http) { }

    authorized() : Observable<boolean> {
        return this.http.get("/api/" + "check-authorization", {withCredentials: true}).map(res => res.json().authorized);
    }

    login(){
        console.log("Start Login")
        this.http.request("/api/authorise")
    }
}
