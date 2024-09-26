import { LightningElement, track, api } from 'lwc';
import getContacts from '@salesforce/apex/wrapperTable.getContacts';
import updateContacts from '@salesforce/apex/wrapperTable.updateContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from "@salesforce/schema/Contact.Id";
import LASTNAME_FIELD from "@salesforce/schema/Contact.lastName";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import { refreshApex } from "@salesforce/apex";

export default class CustomTable extends LightningElement {
    

    @api recId;
    @track lastName;
    @track Email;
    @track Phone;
    @track isEdited = false;
    @track records = [];
    @track draftValues = [];
    @track recId;
    @track index;
    //@track loading = false;

    rec = {
        lastName: this.lastName,
        Email: this.Email,
        Phone: this.Phone
    }

    connectedCallback(){  
        console.log('conect call back');
        getContacts()
            .then((result)=>{
                //console.log('method called', getContacts);
                console.log('result',JSON.stringify(result));
                this.records = result;
                console.log('record',JSON.stringify(this.records));
                
            })
            .catch((error)=>{
                this.error = error;
            });
        
    }

    handleEdit(event){
        const recId = event.currentTarget.dataset.id;
        console.log('abc',recId);
        this.records.forEach(con => {
            if(con.Id == recId) {
                console.log('Yes In---',con.Id);
                con.isEdited = true; 
                //console.log('editing',this.isEdited);
            } 
            // else {
            //     this.isEdited = false;
            // }
        });
    }
    // handleEdit(event){
    //     this.isEdited = true;
    // }

    handleCancel(event){
        console.log('cancel button called');
        const recId = event.currentTarget.dataset.id;
        console.log('cancel abc',recId);
        this.records.forEach(con => {
            if(con.Id == recId) {
                console.log(' camcel Yes In---',con.Id);
                con.isEdited = false; 
                con.onCancel = true;
                //console.log('editing',this.isEdited);
            } 
        });
    }
    
    handleChange(event){
        this.rec.lastName = event.target.value;
        console.log('handle change called', JSON.stringify(this.rec.lastName));
    }
    handleEmailChange(event){
        this.rec.Email = event.target.value;
        console.log('handle email change called', JSON.stringify(this.rec.Email));
    }
    handlePhoneChange(event){
        this.rec.Phone = event.target.value;
        console.log('handle account name change called', JSON.stringify(this.rec.Phone));
    }

    handleSave(event){
        console.log('save button called');
        this.loading = true;
        console.log('loading');
        const recId = event.currentTarget.dataset.id;
        
        this.records.forEach(con => {
            if(con.Id == recId) {
                console.log('this.lastname --- '+ this.rec.lastName);
                console.log('this.Email ----- '+ this.rec.Email);
                console.log('this.Phone ----- '+ this.rec.Phone);
                updateContacts({contactId:con.Id, contactName:this.rec.lastName, contactEmail:this.rec.Email, contactPhone:this.rec.Phone})
                .then( accountDetails => {
                    this.records=[];
                    this.records=accountDetails;
                    console.log('accountDetails:'+JSON.stringify(accountDetails))
                    this.loading = false;
                    console.log('loading stop');
                })
                .catch( error => {
                    console.log('error:'+JSON.stringify(error))
                })
                // const fields = {};
                // fields[ID_FIELD.fieldApiName] = con.Id;
                // fields[LASTNAME_FIELD.fieldApiName] = this.rec.lastName;
                // fields[EMAIL_FIELD.fieldApiName] = this.rec.Email;
                // fields[PHONE_FIELD.fieldApiName] = this.rec.Phone;

                // const recordInput = { fields };
                // console.log('recordinput-----',recordInput);

                // updateRecord(recordInput)
                // .then(()=>{
                //     con.isEdited = false;
                // })
                // .catch((error) => {
                //     console.log('error updating data =>'+this.error.body.message);
                // });
                // console.log('recordinput========',recordInput);


                // const recordInputs = event.detail.draftValues.slice().map(draft=>{
                //     const fields = Object.assign({}, draft)
                //     return {fields}
                // })
                // const promises = recordInputs.map(recordInput => updateRecord(recordInput))
                // promise.all(promises)
                // console.log('draft values');
                //this.loading = false;
                con.isEdited = false;
                //this.handleCancel(event);
                //this.loading = true;
            } 
        });

    }
}