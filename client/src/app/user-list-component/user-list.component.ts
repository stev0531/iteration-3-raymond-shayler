import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    name: string = "Pleaselogin";
    constructor(public userService: UserService, public dialog: MdDialog) {
    }

    switchName(user: string) {
        this.name = user;
    }

    ngOnInit() {
        this.userService.getUsers();
    }

    openAddDialog() {
        this.userService.getUsers();
    }

}
