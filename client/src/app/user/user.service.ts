import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    public users: User[];

    private userUrl: string = environment.API_URL + "users";

    public getUsers(): void {
        this.http.request(this.userUrl, {withCredentials: true}).map(res => res.json()).subscribe(
            userrs => {
                this.users = userrs;
            }, err => {
                console.log(err);
            }
        );
    }

    public getUser(id: string): Observable<User> {
        let newUser: Observable<User> = this.http.request(this.userUrl + "/" + id).map(res => res.json());
        return newUser;
    }
}
