import { LightningElement } from 'lwc';

export default class ApexHourBindVariable extends LightningElement {
    FirstName = '';
    LastName = '';
    handleChange(event){
        const field = event.target.name;
       if(field === 'FirstName'){
        this.FirstName = event.target.value;
       } else if (field === 'LastName'){
        this.LastName = event.target.value;
       }
    }

    get UpperCaseName(){
        return `${this.FirstName} ${this.LastName}`.toUpperCase();
    }
}