import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { Contact } from "../shared/contact";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class ContactService {

    pushedDataEvent = new BehaviorSubject<Contact[]>([]);
    pushedDataEv$ = this.pushedDataEvent.asObservable();

    private contacts: Contact[] = [];
    private endpoint: string = 'assets/data/contacts.json';


    constructor(private http: Http) { }

    fillData(response: Response): Contact[] {
        let aux: Contact;
        let array: Contact[] = [];
        let data: any[] = response.json();

        for (let key in data) {
            aux = data[key];
            array.push(new Contact(aux.id, aux.image, aux.name, aux.surname, aux.address, aux.zipcode, aux.city, aux.phone, aux.email, aux.favorite));
        }

        return array;
    }

    getContacts() {
        // If we only want to pass an Observable to the component
        //return this.http.get(this.endpoint).map((response: Response) => response.json());

        // In this case we need to store the data in our service
        return this.http.get(this.endpoint)
                .map((response: Response) =>  {

                    this.contacts = this.fillData(response);
                    return this.contacts;
                });
    }

    getContact(id: number) {
        var emptyContact = new Contact(0, '', '', '', '', '', '', '', '', false);

        return _.find(this.contacts, function(contact) { 
            return contact.id == id;      // Notice that we are using the == operator. Avoid typing.
        }) || emptyContact;               // Return empty contact if id doesn't match
    }

    /* New contact id number will be the next position in the array */
    getNewId() {
        return this.contacts.length + 1;
    }

    addContact(contact: Contact) {
        contact.id = this.getNewId();
        this.contacts.push(contact);
    }

    editContact(id: number, contact: Contact) {

        var index =  _.findIndex(this.contacts, function(contact) { 
            return contact.id == id; 
        });

        this.contacts[index] = contact;

    }

    /* This function communicates two sibling components*/
    pushData() {
        this.pushedDataEvent.next(this.contacts);
    }

}