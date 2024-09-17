import { LightningElement, track, wire } from 'lwc';
import getAccountlist from '@salesforce/apex/SFDX.getAccountlist';

export default class SFDXAccountCustomTable extends LightningElement {
    @track error;
    @track Conlist =[];
    @wire(getAccountlist)
        wiredContacts({data, error}){
            if(data){
                this.Conlist = data;
            } else if(error){
                this.error = error;
            }
        
    }
}