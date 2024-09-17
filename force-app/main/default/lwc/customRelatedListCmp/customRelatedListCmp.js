import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getVersionFiles from '@salesforce/apex/FileUploaderClass.getVersionFiles';
import getRelatedFinancialFilesByRecordId from '@salesforce/apex/FileUploaderClass.getRelatedFinancialFilesByRecordId';
import getRelatedSamplingFilesByRecordId from '@salesforce/apex/FileUploaderClass.getRelatedSamplingFilesByRecordId';
import getRelatedQuoteFilesByRecordId from '@salesforce/apex/FileUploaderClass.getRelatedQuoteFilesByRecordId';
import {NavigationMixin} from 'lightning/navigation';
export default class CustomRelatedListCmp extends NavigationMixin(LightningElement) {

    @api recordId;
    @track wireFinancialFilesList =[];
    @track wireSamplingFilesList =[];
    @track wireQuoteFilesList =[];
    @track fileData;
    @track files = [];

    connectedcallback(){
        console.log('connected callback called');
    }
    //connectedcallback(){
        //console.log('connected callback called');
        // getRelatedFinancialFilesByRecordId({recordId: this.recordId})
        // .then(data => {
        //     console.log('getRelatedFinancialFilesByRecordId called');
        //     console.log('getRelatedFinancialFilesByRecordId------------------->',data);
        //     this.wireFinancialFilesList = Object.keys(data).map(item=>({"label":data[item],
        //      "value": item,
        //      "url":`/sfc/servlet.shepherd/document/download/${item}`
        //     }))
        //     console.log(this.wirefilesList)
        // })
        // .catch(error => {
        //     console.error('Error getRelatedFinancialFilesByRecordId:', error);
        // });
    //}
    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }
    get acceptedFormats() {
        console.log('this.recordid', this.recordId)
        console.log('get method called')
        
        return ['.pdf', '.png','.jpg','.jpeg','.xlsx','.xls' ];
        
    }

    
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;

        var File_Id = event.currentTarget.dataset.id;
        console.log('File_Id---------------------->',File_Id);
       
        let uploadedFileNames = '';
        console.log('uploadedFileNames------------------>',JSON.stringify(uploadedFiles));


        let CVLIST = [];
        uploadedFiles.forEach(items => {
            let file = {
                Id: items.contentVersionId,
                Title: File_Id + '' + items.name,
                Extension: items.mimeType,
                ContentDocumentId: items.documentId,
                thumbnailFileCard: '/sfc/servlet.shepherd/document/download/' + items.documentId
            };
            CVLIST.push(file);
        });
            getVersionFiles({CVList: CVLIST, relatedRecId: this.recordId, File_Id: File_Id})
            .then(result => {
                console.log('result-----------------> ' , JSON.stringify(result));
            })
            .catch(error => {
                console.error('Error getVersionFiles:', error);
            });
       
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
        
    }
    
    @wire(getRelatedFinancialFilesByRecordId, {recordId: '$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log('getRelatedFinancialFilesByRecordId------------------->',data);
            this.wireFinancialFilesList = Object.keys(data).map(item=>({"label":data[item],
             "value": item,
             "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log(this.wirefilesList)
        }
        if(error){ 
            console.log(error)
        }
    }
    // @wire(getRelatedSamplingFilesByRecordId, {recordId: '$recordId'})
    // wiredResult({data, error}){ 
    //     if(data){ 
    //         console.log('getRelatedSamplingFilesByRecordId------------------------>',data);
    //         this.wireSamplingFilesList = Object.keys(data).map(item=>({"label":data[item],
    //          "value": item,
    //          "url":`/sfc/servlet.shepherd/document/download/${item}`
    //         }))
    //         console.log(this.wireSamplingFilesList)
    //     }
    //     if(error){ 
    //         console.log(error)
    //     }
    // }
    // @wire(getRelatedQuoteFilesByRecordId, {recordId: '$recordId'})
    // wiredResult({data, error}){ 
    //     if(data){ 
    //         console.log('getRelatedQuoteFilesByRecordId-------------------------->',data);
    //         this.wireQuoteFilesList = Object.keys(data).map(item=>({"label":data[item],
    //          "value": item,
    //          "url":`/sfc/servlet.shepherd/document/download/${item}`
    //         }))
    //         console.log(this.wireQuoteFilesList)
    //     }
    //     if(error){ 
    //         console.log(error)
    //     }
    // }
    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}