import { LightningElement, track } from 'lwc';
import sendEmail from '@salesforce/apex/jobEmailController.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class SendResume extends LightningElement {

     @track email = '';
    @track contentDocumentId = '069J3000004viYhIAI';
    subject = 'Job Application for Salesforce Developer - 2+ years';
    body = 'Hello, this is an email sent to you.';

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleSendEmail() {
        if (!this.email) {
            this.showNotification('Error', 'Email address is required', 'error');
            return;
        }

        sendEmail({ 
            email: this.email, 
            subject: this.subject, 
            contentDocumentId: this.contentDocumentId 
        })
        .then(() => {
            this.showNotification('Success', 'Email sent successfully', 'success');
            this.email = '';
        })
        .catch(error => {
            this.showNotification('Error', error.body.message, 'error');
        });
    }

    showNotification(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

}