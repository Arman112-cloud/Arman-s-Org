import { LightningElement, track } from 'lwc';

export default class InspectionSumoQuote extends LightningElement {
    myVal = '**Hello**';
    formats = [
        'bold',
        'italic',
        'underline',
        'list',
        'link',
    ];

    @track Sectionlist = [{
        'secIndex': this.secIndex,
        'list': [{
            'fileUploader':'',
            'myVal': '**Hello**'
        }]
    }];
    connectedCallback(){
        console.log('data is comming');
        this.initData();
        console.log('this.initData',this.initData);
    }
    initData(){
        let Sectionlist = [];
        this.Sectionlist = [{
            'secIndex': this.secIndex,
            'list': [{
                'fileUploader':'',
                'myVal': '**Hello**'
            }]
        }];
    }

    @track secIndex = 0;
    addSection(){
        this.secIndex ++;
        var secobj = {
            'secIndex': this.secIndex,
                'list': [{
                    'fileUploader':'',
                    'myVal': '**Hello**'
                }]
            }
        this.Sectionlist.push(secobj);
    }
    deleteSection(event){
        var rowIndex = event.currentTarget.dataset.index;
        if(this.Sectionlist.length>=1){
            console.log(' section if called ');
            this.Sectionlist.splice(rowIndex,1);
        }
    }
    addRow(event){
        var index = event.currentTarget.dataset.id;
        this.Sectionlist[index].list.push({
            'fileUploader':'',
            'myVal': '**Hello**'
        });
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
}