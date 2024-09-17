import { LightningElement, track } from 'lwc';

export default class AppContainer extends LightningElement {
    @track feedbackMessage = '';

    handleFeedbackSubmitted(event) {
        // Access the detail of the event
        this.feedbackMessage = event.detail.message;
    }
}
