import { LightningElement, wire } from 'lwc';
import AccountHelper from '@salesforce/apex/AccountHelper.AccountHelper';
import { refreshApex } from '@salesforce/apex';

export default class AccountListLWC extends LightningElement {
    @wire(AccountHelper) 
    accounts;

    handleRefresh() {
        // Call refreshApex to re-fetch the data
        refreshApex(this.accounts);
    }
}