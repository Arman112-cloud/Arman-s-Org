import { LightningElement, track, wire  } from 'lwc';
import getAccountlist from '@salesforce/apex/SFDX.getAccountlist';
export default class SFDXWIreAsProperty extends LightningElement {
    @track columns = [{
            label: 'Account name',
            fieldName: 'Name',
            type: 'text',
            
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            
        }
    ];
    @track error;
    @track accList ;
    @wire(getAccountlist)
        wiredAccount({data, error}){
            if(data){
                this.accList = data;
            } else if(error){
                this.error = error;
            }
        }
}
