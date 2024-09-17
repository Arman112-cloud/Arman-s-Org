import { LightningElement } from 'lwc';
import findAccountList from '@salesforce/apex/AccountController.getAccList';

export default class Parameter extends LightningElement {
    searchKey = '';
    accounts;
    handleonchange(event){
        this.searchKey = event.target.value;
    }

    buttonClick(){
        findAccountList({keyword: this.searchKey})
        .then((result)=>{
            this.accounts = result;
            this.error = undefined;
        })
        .catch((error)=>{
            this.error = error;
            this.accounts = undefined;
        });
    }
}