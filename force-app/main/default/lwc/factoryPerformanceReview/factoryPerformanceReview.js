import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class FactoryPerformanceReview extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [STAGE_FIELD] })
    opportunity;

    connectedCallback() {
        // This method is called when the component is inserted into the DOM
        this.logStageValue();
    }

    logStageValue() {
        if (this.opportunity.data) {
            const stageValue = getFieldValue(this.opportunity.data, STAGE_FIELD);
            console.log('Stage Value:', stageValue);

            if (stageValue === 'Closed Won' || stageValue === 'Closed Lost') {
                // Your logic here
            }
        }
    }
}