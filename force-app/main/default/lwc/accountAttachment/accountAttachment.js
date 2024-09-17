import { LightningElement,wire, api } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountDetailsController.getOpportunities';
import {NavigationMixin} from 'lightning/navigation';

export default class AccountAttachment extends NavigationMixin(LightningElement) {
    @api recordId;
    opportunities;
    error;
    attachments;

    connectedCallback() {
        this.loadOpportunities();
    }

    loadOpportunities() {
        getOpportunities({ accountId: this.recordId })
            .then(result => {
                this.opportunities = result;
                this.opportunities.forEach(opportunity => {
                    opportunity.relatedFiles = opportunity.relatedFiles.slice(0, 5);
                });
            })
            .catch(error => {
                console.error('Error fetching opportunities', error);
            });
    }

    handlePreviewFile(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({
            type: "standard__namedPage",
            attributes: {
              pageName: "filePreview",
            },
            state: {
              selectedRecordId: event.target.dataset.id,
            },
          });
    }

    viewAll(event) {
       let OppId = event.target.dataset.id;
        console.log('OppId', OppId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: OppId,
                objectApiName: 'Account',
                relationshipApiName: 'CombinedAttachments',
                actionName: 'view'
            }
        });
        
    }

    navigateToOpportunity(event){
        let OppId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: OppId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            },
        });
    }
}