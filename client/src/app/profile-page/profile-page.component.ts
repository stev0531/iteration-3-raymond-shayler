import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit() {
      this.userService.getUser("58af3a590343927e48e87205");

      console.log(this.authService.authorized());
  }

}
