import { LightningElement, wire } from 'lwc';
import AccountHelper from '@salesforce/apex/AccountHelper.AccountHelper';

export default class AccountListLWCFunction extends LightningElement {
    accounts;
    errors;
    handleLoad(){
        AccountHelper()
            .then(result => {
                this.accounts =  result;
            })
            .catch(error => {
                this.error = errors;
            });
    }
}