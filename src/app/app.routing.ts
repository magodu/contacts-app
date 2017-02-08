import { Routes, RouterModule } from "@angular/router";

import { ContactComponent } from './contact/contact.component';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';


const APP_ROUTES: Routes = [
    { path: 'detail/:id', component: ContactComponent },
    { path: 'new', component: AddEditContactComponent },
    { path: 'edit/:id', component: AddEditContactComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);