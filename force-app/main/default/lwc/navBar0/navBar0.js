import { LightningElement, track } from 'lwc';

export default class NavBar0 extends LightningElement {
    Data = [];
    // @track ElementList = [
    //     {
    //         Id: 1, title: 1, Title:'Title',
    //         Id: 2, title: 2, Title:'Letter from the owner',
    //         Id: 3, title: 3, Title:'Quote Details',
    //         Id: 4, title: 4, Title:'Inspection',
    //         Id: 5, title: 5, Title:'Authorization Page',
    //         Id: 6, title: 6, Title:'Terms and Conditions',
    //         Id: 7, title: 7, Title:'Warranty',
    //         Id: 8, title: 8, Title:'Custom Page',
    //     }
    // ];
    @track ElementList = [
        {
            Title:'Title',
            Title:'Letter from the owner',
            Title:'Quote Details',
            Title:'Inspection',
            Title:'Authorization Page',
            Title:'Terms and Conditions',
            Title:'Warranty',
            //Title:'Custom Page',
        }
    ];

    connectedCallback(){
        
        if(!this.ElementList){
            this.ElementList = this.Data;
        }
    }
}