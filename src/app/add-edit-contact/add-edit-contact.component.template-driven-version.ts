// template-driven forms version 


import { Component, OnInit } from '@angular/core';
import { Contact } from "../shared/contact";
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../shared/contact.service";
// Template-driven
import { NgForm } from "@angular/forms";


@Component({
    selector: 'app-add-edit-contact',
    templateUrl: './add-edit-contact.component.html',
    styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {

    private subscription: Subscription;
    private contactIndex: number;
    private mode: string;
    contact: Contact;
    contacts: Contact[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private contactService: ContactService) {}


    ngOnInit() {
        var path = this.router.url;
        this.mode = path.indexOf('edit') === -1 ? 'new' : 'edit';

        if (this.mode === 'edit') {
            this.subscription = this.route.params.subscribe(
                (params: any) => {
                    this.contactIndex = params['id'];
                    this.contact = this.contactService.getContact(this.contactIndex); 
                }
            );

            // If we load or refresh a url like SERVER/edit/1 the component doesn't have the data in the beginning
            // The component have to wait until service load data and ContactsList component notify this fact.
            this.contactService.pushedData.subscribe(
                (contacts: Contact[]) => {
                    this.contact = this.contactService.getContact(this.contactIndex);
                }
            );
        } else {
            this.contact = new Contact(0, '', '', '', '', '', '', '', '', false);
        }

    }

    onCancel() {
        if (this.mode === 'edit') {
            this.router.navigate(['/detail', this.contactIndex]);
        } else {
            this.router.navigate(['/']);
        }
    }

    onSubmit(form: NgForm) {

        let newContact = form.value;

        if (this.mode === 'edit') {

            newContact.id = this.contact.id;

            this.contactService.editContact(this.contactIndex, newContact);
            this.router.navigate(['/detail', this.contactIndex]);
            this.contactService.pushData();     // Notify changes to contact-list component

        } else {

            if (!newContact.image) {            // If we don't type an image we'll put one by default
                newContact.image = 'unknown.jpg';
            }

            this.contactService.addContact(newContact);
            this.contactService.pushData();      // Notify changes to contact-list component
            this.router.navigate(['/']);

        }
    }

}
