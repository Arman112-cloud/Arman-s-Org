import { LightningElement, track } from 'lwc';

export default class ApexHourParent extends LightningElement {
    @track chValue;
    handleChangeEvent(event){
        var chValue = event.target.value;
        this.template.querySelector('c-apex-hour-child').changeMessage(chValue);
    }
}