import { LightningElement,track } from 'lwc';
import ContactLWC from '@salesforce/apex/ContactLWC.ContactLWC';

export default class ContactsOnAccount extends LightningElement {
    @track contact;
    @track error;
    handleLoad() {
        console.log('handleLoad method called');
        ContactLWC()
        .then(result =>{
            this.contact = result;
            //this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            console.log('this.error ---- '+this.error );
        });
    }
}