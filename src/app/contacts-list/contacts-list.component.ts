import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Contact } from "../shared/contact";
import * as _ from 'lodash';
import { ContactService } from "../shared/contact.service";
import { FilterByTextPipe } from "../shared/filterByText.pipe";
import { FilterByFavoritePipe } from "../shared/filterByFavorite.pipe";

@Component({
	selector: 'app-contact-list',
	templateUrl: './contacts-list.component.html',
	styleUrls: ['./contacts-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit {

    private showfilters: boolean = false;
    private textFilter: string = '';
    private favoriteFilter: boolean = false;
    
	contacts: Contact[] = [];

	constructor(private contactService: ContactService, private ref: ChangeDetectorRef) { }

	ngOnInit() {

        this.contactService.getContacts().subscribe(
            data => {                                   // First argument is a function which runs on success
                        this.contacts = data;
                        // Force change detection. More info: https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
                        this.ref.markForCheck();
                        this.contactService.pushData();
            },       
            err => {},                                  // Second argument is a function which runs on error                           
            () => console.log('loading data: done')     // Third argument is a function which runs on completion
        );


        this.contactService.pushedDataEv$.subscribe(
            (contacts: Contact[]) => {
                this.contacts = contacts;

                // Force change detection. More info: https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
                this.ref.markForCheck();
            }
        );

	}

	toggleFilters() {
        this.showfilters = !this.showfilters;
        this.textFilter = '';
        this.favoriteFilter = false;
    }

    setFavorite(id: number) {
    	var idContact = _.findIndex(this.contacts, function(contact) { 
            return contact.id == id; 
        });

        this.contacts[idContact].favorite = !this.contacts[idContact].favorite;
        this.contactService.editContact(idContact, this.contacts[idContact]);
    }

}
