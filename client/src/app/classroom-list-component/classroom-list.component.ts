import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MdDialog} from "@angular/material";
import {ClassroomService} from "../classroom/classroom.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

    constructor(public classroomService: ClassroomService, public dialog: MdDialog) {
    }

  ngOnInit() {
      this.classroomService.getClassrooms();
  }

    openAddDialog() {
        this.classroomService.getClassrooms();
    }

}
