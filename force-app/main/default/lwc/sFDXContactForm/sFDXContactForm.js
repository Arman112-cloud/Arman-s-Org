import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ContactName from '@salesforce/schema/Contact.LastName';
import ContactEmail from '@salesforce/schema/Contact.Email';
import conObject from '@salesforce/schema/Contact';

export default class SFDXContactForm extends LightningElement {
    ContactName = '';
    ContactEmail='';

    handleNameChange(event){   
            this.ContactName = event.target.value;
    }
    handleEmailChange(event){
            this.ContactEmail = event.target.value;
    }

    handleSave(){
        const fields = {};
        fields[ContactName.fieldApiName] = this.ContactName;
        fields[ContactEmail.fieldApiName] = this.ContactEmail;
        const recordInput = { apiName: conObject.objectApiName, fields };

        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}

