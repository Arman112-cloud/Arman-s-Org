import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile'
export default class FileUploaderCompLwc extends LightningElement {
    @api recordId;
    fileData

    /*openfileUpload(event) {
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
    }*/
    
    openfileUpload(event) {
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = () => {
                // Check the file size before compression
                if (reader.result.length > 500 * 1024) {
                    // File size exceeds 500 KB, perform compression
                    const img = new Image();
                    img.src = reader.result;
    
                    img.onload = () => {
                        const maxWidth = 2550; // Set your desired maximum width
                        const maxHeight = 3300; // Set your desired maximum height
                        let width = img.width;
                        let height = img.height;
    
                        // Resize image if it exceeds the maximum dimensions
                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width = width * ratio;
                            height = height * ratio;
                        }
    
                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
    
                        // Compress the image to a data URL with specified quality
                        const compressedImage = canvas.toDataURL('image/jpeg', 0.8); // Adjust the quality as needed (0.0 to 1.0)
    
                        // Check the size of the compressed image
                        //if (compressedImage.length / 1.37 < 1000 * 1024) {
                            this.fileData = {
                                'filename': file.name,
                                'base64': compressedImage.split(',')[1],
                                'recordId': this.recordId
                            };
    
                            console.log('Compressed File Data:', this.fileData);
                        //} else {
                        //    console.error('Compressed image still exceeds 500 KB limit.');
                        //}
                    };
                } else {
                    // File size is already below 500 KB, no need for compression
                    this.fileData = {
                        'filename': file.name,
                        'base64': reader.result.split(',')[1],
                        'recordId': this.recordId
                    };
    
                    console.log('File Data:', this.fileData);
                }
            };
    
            reader.readAsDataURL(file);
        }
    }

    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
}