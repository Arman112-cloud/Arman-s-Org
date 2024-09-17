import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/ApexHourWrapperClass.getAccounts';

export default class ApexHourDataTable extends LightningElement {
    @track recId;
    @track records;

    connectedCallback(){
        getAccounts()
            .then((result)=>{
                this.records = result;
            })
            .catch((error)=>{
                this.error = error;
            });
    }

    click(event){
        var recId = event.currentTarget.dataset.id;
        console.log('this is the recId--------------------->',recId);
    }
}