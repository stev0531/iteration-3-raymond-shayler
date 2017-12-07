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
import {DeckChangesDialogComponent} from "./deck-changes-dialog/deck-changes-dialog";
import {ResultsComponent} from "./results/results.component";
import {StartScreenComponent} from "./start-screen/start-screen.component";
import {AuthService} from "./auth/auth.service";
import { ReactiveFormsModule} from "@angular/forms";
import {SelectColorComponent} from "./select-color/select-color.component";
import {DeleteDeckDialogComponent} from "./delete-deck-dialog/delete-deck-dialog";
import {DeleteCardDialogComponent} from "./delete-card-dialog/delete-card-dialog";
import {CardService} from "./card/card.service";

@NgModule({

    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        SharedModule,
        ReactiveFormsModule
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
        PlayComponent,
        DeleteDeckDialogComponent,
        DeleteCardDialogComponent,
        SelectColorComponent,
    ],
    entryComponents: [
        NewCardDialogComponent,
        NewDeckDialogComponent,
        ResultsComponent,
        CardDisplayDialogComponent,
        CardComponent,
        DeckChangesDialogComponent,
        CardComponent,
        DeleteDeckDialogComponent,
        DeleteCardDialogComponent,
    ],
    providers: [
        CardListService,
        DeckService,
        CardService,
        AuthService,
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
