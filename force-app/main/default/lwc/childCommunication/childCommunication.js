import { LightningElement } from 'lwc';

export default class ChildCommunication extends LightningElement {
    handleOnClick(){
        this.dispatchEvent(new CustomEvent('increasecount'));
    }
}