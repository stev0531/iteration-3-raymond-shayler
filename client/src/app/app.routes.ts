// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {PlayComponent} from "./play-component/play.component";
import {HelpComponent} from "./help-component/help.component";
import {CardListComponent} from "./card-list-component/card-list.component";
import {ClassroomListComponent} from "./classroom-list-component/classroom-list.component";
import {UserListComponent} from "./user-list/user-list.component";

// Route Configuration
export const routes: Routes = [
    {path: 'play/:deck', component: PlayComponent},
    {path: 'decks/:id', component: DeckComponent},
    {path: 'decks', component: DeckListComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'card', redirectTo: '/decks', pathMatch: 'full'},
    {path: 'help', component: HelpComponent},
    {path: 'card-list', component: CardListComponent},
    {path: 'classrooms', component: ClassroomListComponent},
    {path: 'users', component: UserListComponent},
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
