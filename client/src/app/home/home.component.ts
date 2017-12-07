import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'home.component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    public text: string;
    showTeachOptions= false;

    constructor(private _authService: AuthService) {
        this.text = "Hello world!";
    }

    ngOnInit() {
        this._authService.authorized().subscribe(
            newauth => {
                this.showTeachOptions = newauth;
            },
            err => {
                console.log(err);
            }
        );
    }
}
