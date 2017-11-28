import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {ClassroomService} from "../classroom/classroom.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

    @Input() name: string = "";

    classroom: string = "";
    constructor(public classroomService: ClassroomService, public dialog: MdDialog) {
    }

  ngOnInit() {
      this.classroomService.getClassrooms();
  }

    openAddDialog() {
        this.classroomService.getClassrooms();
    }

    selectClassroom(classroom: string, $event: string) {
        this.classroom = classroom;
    }

}
