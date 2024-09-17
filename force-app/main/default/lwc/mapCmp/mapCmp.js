import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry';
import BILLING_STATE from '@salesforce/schema/Account.BillingState';
import BILLING_CITY from '@salesforce/schema/Account.BillingCity';
import BILLING_STREET from '@salesforce/schema/Account.BillingStreet';
import BILLING_POSTALCODE from '@salesforce/schema/Account.BillingPostalCode';

//import AccountAddrs from '@salesforce/apex/AccountAddrs.AccountAddrs';
//import City from '@salesforce/schema/Lead.City';
export default class Map extends LightningElement {

    @api recordId;
    @track mapMarkers =[{
        location:{
            Country: data.fields.BillingCountry.value,

                        State: data.fields.BillingState.value,

                        City: data.fields.BillingCity.value,

                        Street: data.fields.BillingStreet.value,

                        PostalCode: data.fields.BillingPostalCode.value
        }
    }];
    connectedCallback(){
        getRecord({

            recordId: '$recordId',
    
            fields: [BILLING_COUNTRY, BILLING_STATE, BILLING_CITY, BILLING_STREET, BILLING_POSTALCODE,
    
                SHIPPING_COUNTRY, SHIPPING_STATE, SHIPPING_CITY, SHIPPING_STREET, SHIPPING_POSTALCODE]
    
        })
        this.mapMarkers = [
            {
              location: {
                Country: data.fields.BillingCountry.value,
                State: data.fields.BillingState.value,
                City: data.fields.BillingCity.value,
                Street: data.fields.BillingStreet.value,
                PostalCode: data.fields.BillingPostalCode.value
              }
            }
        ];
    }
}




//     @wire(getRecord, {

//         recordId: '$recordId',

//         fields: [BILLING_COUNTRY, BILLING_STATE, BILLING_CITY, BILLING_STREET, BILLING_POSTALCODE]

//     })

//     fetchAddressDetails({data, error}){

//         if(data){

//             this.mapMarkers = [

//                 {

//                     location: {

//                         Country: data.fields.BillingCountry.value,

//                         State: data.fields.BillingState.value,

//                         City: data.fields.BillingCity.value,

//                         Street: data.fields.BillingStreet.value,

//                         PostalCode: data.fields.BillingPostalCode.value

//                     }
//                 }
//                 ];

//         }else if(error){

//             console.log('error' + error);

//         }

//     }

// }


















    // @track error;  
    // @track mapMarkers = [];
    // @track zoomLevel = 4;

    // @wire(AccountAddrs)
    // wiredAccountAddrs({error, data}){
    //     if(data){
    //         data.forEach(dataItem => {
    //             this.mapMarkers = [...this.mapMarkers ,
    //                 {
    //                     location: {
    //                         City: dataItem.BillingCity,
    //                         Country: dataItem.BillingCountry,
    //                     },
        
    //                     icon: 'custom:custom26',
    //                     title: dataItem.Name,
    //                 }                                    
    //             ];
    //           });   
    //           console.log('City',City)
    //           this.error = undefined;
    //     } else if (error) {
    //         this.error = error;
    //         this.contacts = undefined;
    //     }
    // }         
    //}