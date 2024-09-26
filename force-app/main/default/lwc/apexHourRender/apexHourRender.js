import { LightningElement, track } from 'lwc';

export default class ApexHourRender extends LightningElement {
     
    ae = {
        name: 'arman',
        phone: '123'
    };

    

    handleChange(event){
        this.ae.name = event.target.value;
        this.ae.phone = event.target.value;
    }
}