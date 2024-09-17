import { LightningElement, track, api } from 'lwc';

export default class ApexHourChild extends LightningElement {
    @track Message;
    @api changeMessage(str){
        this.Message = str.toUpperCase();
    }
}