import { LightningElement, track, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllOpportunitiesList from '@salesforce/apex/GenerateTemplatePDF.getAllOpportunities';
export default class GenerateTemplatePDF extends LightningElement {
    @track opportunities = {};
    @track error;
    @api recordId;
    @track opportunityName;
    @wire(CurrentPageReference) pageRef;  

      
    connectedCallback(){
        if (this.pageRef && this.pageRef.state && this.pageRef.state.recordId) {
            this.recordId = this.pageRef.state.recordId; 
        }
        getAllOpportunitiesList({ recordId: this.recordId })
        .then((result) => {
            console.log('rec id ----------------->',this.recordId);
            this.opportunities = result;
            console.log('opportunities------------------------->',JSON.stringify(result));
            result.forEach(element => {
              this.opportunityName = element.oppRecord.Name;
              console.log('Opportunity Name:', opportunityName);
            });
          })
          .catch((error) => {
            this.error = error;
          });
          
    }
}