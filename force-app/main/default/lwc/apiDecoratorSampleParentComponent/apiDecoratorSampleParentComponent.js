import { LightningElement, api, track } from 'lwc';

export default class ApiDecoratorSampleParentComponent extends LightningElement {
    @api message = 'abcabcabc';
    handleChange(event){
        this.message = event.tarrget.value;
    }
}