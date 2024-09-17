import { LightningElement, wire, track, api } from 'lwc';
import AccountHelper from '@salesforce/apex/AccountHelper.AccountHelper';

export default class AccountLWC extends LightningElement {
    @track columns = [{
        lable: 'Account Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true 
    },
    {
        lable: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true 
    },
    {
        lable: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'Currency',
        sortable: true 
    },
    {
        lable: 'Phone',
        fieldName: 'Phone',
        type: 'Phone',
        sortable: true 
    },
    {
        lable: 'Website',
        fieldName: 'Website',
        type: 'url',
        sortable: true 
    },
    {
        lable: 'Rating',
        fieldName: 'Rating',
        type: 'test',
        sortable: true 
    },
    {
        type:"button",
        fixedWidth: 150,
        typeAttributes: {
            label: 'Edit',
            name: 'edit',
            variant: 'brand',
            onclick: 'handleReset'
        }

}]; 

@track error;
@track accList;
@wire(AccountHelper)
wiredAccounts({
    error,
    data
}) {
    if(data) {
        this.accList = data;
    } else if(error) {
        this.error = error;
    }
}
}