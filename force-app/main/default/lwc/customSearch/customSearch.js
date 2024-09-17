import { LightningElement, track } from 'lwc';
import getCalloutResponseContents from '@salesforce/apex/OrderController.getCalloutResponseContents';

export default class CustomSearch extends LightningElement {
    
    @track message = '';

    handleCreateOrder() {
        getCalloutResponseContents()
            .then(result => {
                this.message = result;
            })
            .catch(error => {
                this.message = 'Error creating order: ' + error.body.message;
            });
    }
}