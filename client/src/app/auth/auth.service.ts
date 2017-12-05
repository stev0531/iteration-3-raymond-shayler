import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class AuthService {
    constructor(private http: Http) {
    }

    authorized(): Observable<boolean> {
        console.log("checking if I am logged in");

        // let result = this.http.get("/api/" + "checkAuthorization").flatMap(
        //     (response: Response) => {
        //         // return Observable.of({type: "success", authorized: response.json()})
        //         return Observable.map(res => res.json())
        //     });
        //
        // console.log(result);
        // return result.authorized

        let result: Observable<any> = this.http.request(environment.API_URL + "/checkAuthorization", {withCredentials:true});
        return result.map(res => res.toString().authorized);
    }


    login() {
        console.log("Start Login")
        this.http.request("/api/authorise")
    }

    onIni
}
