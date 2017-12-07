import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
    constructor(private http: Http) {
    }

    authorized(): Observable<boolean> {
        console.log("checking if I am logged in");
        let result: Observable<any> = this.http.request(environment.API_URL + "checkAuthorization", {withCredentials:true});
        return result.map(res => res.json().authorized);
    }


    login() {
        console.log("Start Login")
        this.http.request("/api/authorise")
    }

}
