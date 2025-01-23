import { LightningElement, wire } from 'lwc';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' },
];
export default class ContactList extends LightningElement {
    contacts;
    errors;
    columns = COLUMNS;

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.errors = undefined;
        } else if (error) {
            this.contacts = undefined;
            this.errors = this.reduceErrorMessages(error);
        }
    }
    

    get errors() {
        return this.error ? reduceErrors(this.error) : [];
    }
}