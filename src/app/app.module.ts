import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import * as _ from 'lodash';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { routing } from "./app.routing";
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ContactService } from "./shared/contact.service";
import { FilterByTextPipe } from "./shared/filterByText.pipe";
import { FilterByFavoritePipe } from "./shared/filterByFavorite.pipe";
import { USPhonePipe } from "./shared/us-phone.pipe";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        ContactsListComponent,
        AddEditContactComponent,
        FilterByTextPipe,
        FilterByFavoritePipe,
        USPhonePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule
    ],
    providers: [ContactService],
    bootstrap: [AppComponent]
})
export class AppModule { }
