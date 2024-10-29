import { LightningElement, track } from 'lwc';
import createFolder from "@salesforce/apex/BoxCtrl.createFolder";
import uploadFile from '@salesforce/apex/BoxCtrl.uploadFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 
export default class BoxAPILWC extends LightningElement {
    @track fileName = '';
    @track showSpinner = false;
    content;
    fileData;
    newFolderName;
    folderId;
 
 
    handleCreateFolder(event){
        const inputValidation = [...this.template.querySelectorAll('.fieldvalidate')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (inputValidation) {
         //perform success logic
          let inputFields = this.template.querySelectorAll('.fieldvalidate');
          inputFields.forEach(inputField => {
            if(inputField.name == "newFolderName"){
                this.newFolderName = inputField.value;
            }
           });
           this.handleApexCallCreateFolder();
        }
    }
 
    handleApexCallCreateFolder(){
        this.handleSpinner();
        console.log(this.newFolderName);
        createFolder({parentFolderId : '0', folderName : this.newFolderName})
        .then(res=>{
            this.ShowToast('Success!', 'Folder Create Successfully', 'success', 'dismissable');
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
            this.handleSpinner();
        })
    }
 
    handleFolderName(event){
        this.folderId = event.target.value;
    }
 
     // getting file 
    handleFilesChange(event) {
        if(event.target.files.length > 0) {
            const file = event.target.files[0]
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.fileData = {
                    'filename': file.name,
                    'base64': base64,
                    'recordId': this.folderId
                }
                console.log(this.fileData)
            }
            reader.readAsDataURL(file)
        }
    } 
 
    // Calling apex class to upload the file to box storage
    uploadFileToBox() {
        this.handleSpinner();
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64 : base64, filename:filename, folderId:recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`;
            this.ShowToast('Success!', title, 'success', 'dismissable');
        }).catch(err=>{
            this.ShowToast('Error!!', err.body.message, 'error', 'dismissable');
        }).finally(() => {
            this.handleSpinner();
        })
    }
 
    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
}