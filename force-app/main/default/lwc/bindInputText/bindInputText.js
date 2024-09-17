import { LightningElement } from 'lwc';

export default class BindInputText extends LightningElement {
    myvalue = '';
    handleChange(event){
        this.myvalue = event.target.value;
    }
}