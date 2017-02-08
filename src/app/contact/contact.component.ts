import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Contact } from "../shared/contact";
import { USPhonePipe } from "../shared/us-phone.pipe";
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../shared/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private contactIndex: number;
    private defaultImage: string = 'unknown.jpg';
    contactSelected: Contact;

    constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) {
        this.subscription = this.route.params.subscribe(
            (params: Object) => {
                this.contactIndex = params['id'];                
                this.contactSelected = this.contactService.getContact(this.contactIndex);
            }
        );
    }

    ngOnInit() {
        // If we load or refresh a url like SERVER/detail/1 the component doesn't have the data in the beginning
        // The component have to wait until service load data and ContactsList component notify this fact.
        this.contactService.pushedData.subscribe(
            (contacts: Contact[]) => {
                this.contactSelected = this.contactService.getContact(this.contactIndex);
            }
        );

    }


    onEdit() {
        this.router.navigate(['/edit', this.contactIndex]);
    }

    ngOnDestroy() {
        // It prevents memory leaks when component is destroyed
        this.subscription.unsubscribe();
    }

}


