import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    title = 'SAGE';
    showTeachOptions= false;

    constructor(private _authService: AuthService){}

    ngOnInit(){
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
