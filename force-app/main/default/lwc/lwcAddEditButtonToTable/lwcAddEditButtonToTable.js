import { LightningElement, wire, api } from 'lwc';
 import lwcAddEditButtonToTable from '@salesforce/apex/lwcAddEditButtonToTable.lwcAddEditButtonToTable';
 import { NavigationMixin } from 'lightning/navigation';
     const columns = [
         {
             type:"button",
             fixedWidth: 150,
             typeAttributes: {
                 label: 'Edit',
                 name: 'edit',
                 variant: 'brand'
             }
         },       
         {label: 'Name', fieldName: 'Name', type: 'Name'},
         //{label: 'Account', fieldName: 'AccountId', type: 'text'},
         {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
         {label: 'Email', fieldName: 'Email', type: 'Email'}
     ];
 export default class LwcAddEditButtonToTable extends NavigationMixin(LightningElement){
     @api recordId;
     @api issueLogData;
     @api coulumList = columns;
     @api error;
  
     @wire(lwcAddEditButtonToTable)
         wiredData({error, data }){
             if (data){
                 console.log('Data \n', data);
                 this.issueLogData = data;
                 this.error = undefined;
             }
             else if (error){
                 console.error('Error:', error);
             }
         }
 
         navigateToEditAccountPage(LightningElement){
             console.log('Record Id ==> '+ this.recordId);
             this[NavigationMixin.Navigate]({
                 type:'standard__recordPage',
                 attributes:{
                     recordId:'this.recordId',
                     objectApiName:'Lean__IssueLog__c',
                     actionName: 'edit'
                 }
             });
         }
}