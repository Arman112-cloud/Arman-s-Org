import { LightningElement } from 'lwc';

export default class FeedbackForm extends LightningElement {
    handleSubmit() {
        // Create and dispatch the custom event
        const event = new CustomEvent('feedbacksubmitted', {
            bubbles: true,
            composed: true,
            detail: { message: 'Feedback submitted successfully' }
        });
        this.dispatchEvent(event);
    }
}