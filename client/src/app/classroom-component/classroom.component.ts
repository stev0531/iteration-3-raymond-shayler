import {Component, OnInit} from '@angular/core';
import {ClassroomService} from "../classroom/classroom.service";
import {ActivatedRoute} from "@angular/router";
import {Classroom} from "../classroom/classroom";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog, MatDialogConfig} from "@angular/material";


@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

    id: string;
    classroom: Classroom;


    constructor(public classroomService: ClassroomService, private route: ActivatedRoute, public dialog: MdDialog) {


    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.classroomService.getClassroom(this.id).subscribe(
                classroom => {
                    this.classroom = classroom;
                }
            );
        });
    }


}

