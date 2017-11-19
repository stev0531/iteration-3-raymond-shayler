import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {
    MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_SCROLL_STRATEGY_PROVIDER, MdDialogClose, MdDialogContainer,
    MdSnackBar
} from '@angular/material';


import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from "@angular/common";

import {SharedModule} from "./shared.module";
import {CardComponent} from "./card-component/card.component";
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {DeckService} from "./deck/deck.service";
import {PlayComponent} from "./play-component/play.component";
import {MdDialog, MatDialogClose} from "@angular/material";
import {NewCardDialogComponent} from "./new-card-dialog/new-card-dialog.component";
import {NewDeckDialogComponent} from "./new-deck-dialog/new-deck-dialog.component";
import {HelpComponent} from "./help-component/help.component";
import {CardListComponent} from "./card-list-component/card-list.component"
import {CardListService} from "./card-list-component/card-list.service";
import {SimpleCardComponent} from "./simple-card-component/simple-card.component";
import {CardDisplayDialogComponent} from "./card-display-dialog/card-display-dialog.component";
import {ClassroomComponent} from "./classroom-component/classroom.component";
import {ClassroomListComponent} from "./classroom-list-component/classroom-list.component";
import {ClassroomService} from "./classroom/classroom.service";
import {UserListComponent} from "./user-list-component/user-list.component"
import {UserService} from "./user/user.service";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {DeckChangesDialogComponent} from "./deck-changes-dialog/deck-changes-dialog";
import {ResultsComponent} from "./results/results.component";
import {StartScreenComponent} from "./start-screen/start-screen.component";

@NgModule({

    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        DeckComponent,
        DeckListComponent,
        NewCardDialogComponent,
        NewDeckDialogComponent,
        PlayComponent,
        HelpComponent,
        CardListComponent,
        SimpleCardComponent,
        CardDisplayDialogComponent,
        PlayComponent,
        DeckChangesDialogComponent,
        ResultsComponent,
        StartScreenComponent,
        ClassroomComponent,
        ClassroomListComponent,
        PlayComponent,
        UserListComponent,
        ProfilePageComponent,
    ],
    entryComponents: [
        NewCardDialogComponent,
        NewDeckDialogComponent,
        ResultsComponent,
        CardDisplayDialogComponent,
        CardComponent,
        DeckChangesDialogComponent,
        CardComponent
    ],
    providers: [
        CardListService,
        DeckService,
        ClassroomService,
        UserService,
        MdDialog,
        MatDialogClose,
        MdSnackBar,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
