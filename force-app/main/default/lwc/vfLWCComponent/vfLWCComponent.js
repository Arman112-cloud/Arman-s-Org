import { LightningElement, api } from 'lwc';
import generatePDFMethod from '@salesforce/apex/generatePDFfromVF.generatePDFMethod';
export default class VfLWCComponent extends LightningElement {
    @api recordId;
    generatePDF() {
        generatePDFMethod({ recordId: this.recordId })
        .then(result => {
            console.log('file creted successfully');
            this.updateRecordView();
            // handle success
        })
        .catch(error => {
            // handle error
        });
    }

    updateRecordView() {
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
        },1000);
    }
}