import { LightningElement, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import { refreshApex } from '@salesforce/apex';

export default class OpportunityList extends LightningElement {
    @track opportunities;
    @track error; // Track the error property

    @wire(getOpportunities)
    wiredOpportunities({result, error}) {
        if (result) {
            console.log('result', JSON.stringify(result));
            console.log(
                'OpportunityController.getOpportunities returned ' +
                JSON.stringify(result))
            console.log('Data: ',result.data);
            console.log('error: ',result.error);
            
            this.opportunities = result;
            this.error = undefined; // Clear any previous errors
        } else {

            console.log('error: ',error);
            this.opportunities = []; // Clear previous data
            this.error = error; // Set the error
        }
    }

    handleRefresh() {
        // Call refreshApex to re-fetch the data
        //refreshApex(this.wiredOpportunitiesResult);
    }
}