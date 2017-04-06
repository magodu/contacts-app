// model-driven forms version

import { Component, OnInit } from '@angular/core';
import { Contact } from "../shared/contact";
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../shared/contact.service";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";


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

    contactForm: FormGroup;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private contactService: ContactService,
        private formBuilder: FormBuilder) {}


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

            this.contactService.pushedDataEv$.subscribe(
                (contacts: Contact[]) => {
                    this.contact = this.contactService.getContact(this.contactIndex);
                }
            );

        } else {
            this.contact = new Contact(0, '', '', '', '', '', '', '', '', false);
        }

        this.initForm();
    }


    private initForm() {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        let image = '';
        let name = '';
        let surname = '';
        let address = '';
        let zipcode = '';
        let city = '';
        let phone = '';
        let email = '';
        let favorite = false;


        if (this.mode === 'edit') {
            image = this.contact.image;
            name = this.contact.name;
            surname = this.contact.surname;
            address = this.contact.address;
            zipcode = this.contact.zipcode;
            city = this.contact.city;
            phone = this.contact.phone;
            email = this.contact.email;
            favorite = this.contact.favorite;
        }


        // Another way to do the same
        /*
        this.contactForm =  new FormGroup({
            'image': new FormControl(image),
            'name': new FormControl(name, Validators.required),
            'surname': new FormControl(surname, Validators.required),
            'address': new FormControl(address),
            'zipcode': new FormControl(zipcode),
            'city': new FormControl(city),
            'phone': new FormControl(phone),
            'email': new FormControl(email, Validators.pattern(EMAIL_REGEXP)),
            'favorite': new FormControl(favorite)
        });
        */

        this.contactForm = this.formBuilder.group({
            'image': [image],
            'name': [name, Validators.required],
            'surname': [surname, Validators.required],
            'address': [address],
            'zipcode': [zipcode],
            'city': [city],
            'phone': [phone],
            'email': [email, Validators.pattern(EMAIL_REGEXP)],
            'favorite': [favorite]
        });
    }


    onCancel() {
        if (this.mode === 'edit') {
            this.router.navigate(['/detail', this.contactIndex]);
        } else {
            this.router.navigate(['/']);
        }
    }

    onSubmit() {
        let newContact = this.contactForm.value;

        if (this.mode === 'edit') {

            newContact.id = this.contact.id;

            this.contactService.editContact(this.contactIndex, newContact);
            this.router.navigate(['/detail', this.contactIndex]);
            this.contactService.pushData();      // Notify changes to contact-list component

        } else {

            if (!newContact.image) {             // If we don't type an image we'll put one by default
                newContact.image = 'unknown.jpg';
            }

            this.contactService.addContact(newContact);
            this.contactService.pushData();      // Notify changes to contact-list component
            this.router.navigate(['/']);

        }
    }

}
