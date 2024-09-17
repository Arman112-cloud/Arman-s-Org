import { LightningElement, track } from 'lwc';

export default class Screen extends LightningElement {
    Item;
    Quantity;
    Price;
    @track secIndex = 0;
    @track recIndex = 0;
    @track Sectionlist = [{
        'secIndex': this.secIndex,
        'title': '',
        'list': [
            {
                
                'Item': '',
                'Quantity': '',
                'Price': ''
        }
    ]
    }];    
    @track list = [{
                'Item': '',
                'Quantity': '',
                'Price': ''
    }];
    @track Page1 = true;

    connectedCallback(){
        console.log('data is comming');
        this.initData();
        console.log('this.initData',this.initData);
    }
    initData(){
        let list = [];
        let Sectionlist = [{
            'secIndex': this.secIndex,
            'title': '',
        'list': [
            {
                
                'Item': '',
                'Quantity': '',
                'Price': ''
        }
    ]
        }];
        // this.createRow(list);
        this.list = list;
        this.Sectionlist = Sectionlist;
        console.log('list',this.list);
        console.log('INDEX',list.index);
        console.log('this.Sectionlist',this.Sectionlist);
    }
    
    // handleInputChange(event){
    //     let value = event.target.value;
    //     let fieldName = event.target.name;
    //     let index = event.target.dataset.id;

    //     for(let i=0;i<this.list.length;i++){
    //         if(this.list[i].index === parseInt(index)){
    //             this.list[i][fieldName] = value;
    //         }
    //     }
    // }
    addRow(event){
        var index = event.currentTarget.dataset.id;
        //this.recIndex + 1;
        // var recobj = {
            
        //     'Item': '',
        //     'Quantity': '',
        //     'Price': ''
        // }
        
        console.log('list index of section',index)
        console.log('Sectionlist[index]',this.Sectionlist[index]);
        console.log('this.Sectionlist---',this.Sectionlist);
        console.log('this.this.Sectionlist[index].list---',this.Sectionlist.list);
        console.log('this.this.Sectionlist[index].listthis.Sectionlist[index].list---',this.Sectionlist[index].list);
            this.Sectionlist[index].list.push({
            'Item': '',
            'Quantity': '',
            'Price': ''
            });
            console.log('recobj',recobj)
    }

    deleteRow(event){
        var rowIndex = event.currentTarget.dataset.index;
        var sectionId = event.currentTarget.dataset.id;

        console.log('deleteRow called');
        if(this.Sectionlist[sectionId].list.length>=1){
            console.log('if condition called');
            //this.Sectionlist[sectionId].list.splice(event.target.accessKey,1);
            this.Sectionlist[sectionId].list.splice(rowIndex,1);
            
        }
    }
    handleNext(event){
        this.Page1 = true;
    }
    addSection(){
        this.secIndex ++;
        var secObj = {
            'secIndex': this.secIndex,
            'title': '',
        'list': [
            {
                
                'Item': '',
                'Quantity': '',
                'Price': ''
        }
    ]
        }
        this.Sectionlist.push(secObj);
        console.log('sec index sec index secinmdex',this.secIndex)
    }
    deleteSection(event){
        console.log('delete section called');
        var rowIndex = event.currentTarget.dataset.index;
        
        console.log('rowIndex', rowIndex);
        //console.log('secIndex', sectionId);
        console.log('this.Sectionlist[rowIndex].length', this.Sectionlist.length);

        if(this.Sectionlist.length>=1){
            console.log(' section if called ');
            //this.Sectionlist.splice(event.target.accessKey,1);
            this.Sectionlist.splice(rowIndex,1);
            //this.secIndex-1;
        }
        
    }
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
}