import { LightningElement } from 'lwc';

export default class ConditionallyRenderElement extends LightningElement {
    myvalue = "";
    showMe = false;
    handleChange(event){
        this.showMe = event.target.checked;
    }
}