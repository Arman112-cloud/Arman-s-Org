import {LightningElement,api,wire,track} from 'lwc';
import {loadScript} from "lightning/platformResourceLoader";
import workbook from "@salesforce/resourceUrl/writeexcelfile";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {CloseActionScreenEvent} from 'lightning/actions';
import {CurrentPageReference} from 'lightning/navigation';
import insertexcel from '@salesforce/apex/GenrateOpportunityToExcelController.insertexcel';
import { publish, MessageContext } from 'lightning/messageService';
//import REFRESH_CHANNEL from '@salesforce/messageChannel/RefreshChannel__c';
import GeneratePOExcel from '@salesforce/resourceUrl/arman';
import getopportunity from '@salesforce/apex/GenrateOpportunityToExcelController.getopportunity';
import XLSX from "@salesforce/resourceUrl/xlsx";
import FILESAVER from '@salesforce/resourceUrl/FILESAVER';

export default class GenaratePO_Excel extends LightningElement {
    @api recordId;
    error;
    isLoading = false;
    @track xlsdoc;
    isLibraryLoaded = false;
    @track opList = [];
    filename;
    GeneratePOExcel = GeneratePOExcel;
    
    


    @wire(CurrentPageReference) pageRef;
    @wire(MessageContext) messageContext;

    connectedCallback() {
        console.log('1');
        console.log('this is filesaver:', FILESAVER);
        console.log('this is XLSX:', XLSX);
        console.log('this is XLSX:', JSON.stringify(XLSX));
        console.log('my img', this.GeneratePOExcel);
        if(this.pageRef && this.pageRef.state && this.pageRef.state.recordId) {
            this.recordId = this.pageRef.state.recordId;
        }
        getopportunity({recordId: this.recordId})
            .then((data) => {
                console.log('2');
                
                this.opList = data;
                this.filename = this.opList[ 0 ].Name;
                if(this.opList.length > 0) {
                    this.exportToXLSX();
                    const messagePayload = {
                        // Include any data you want to send to Component B
                    };
                    
                    publish(this.messageContext, REFRESH_CHANNEL, {
                        recordId: this.recordId, // Include any relevant data
                        // Include other properties as needed in your message payload
                        // For example, you might use a 'refresh' flag to indicate the purpose of the message
                        refresh: true,
                        data: messagePayload,
                    });
                    
                } else {
                    let event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Record fetching error..',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
                }

            })
            .catch(error => {
                let event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Record fetching error..',
                    variant: 'error',
                });
                this.dispatchEvent(event);
                console.log("failure-------->>>>",error);
            });
            
            //this.createExcelFile();
            this.handleCreateExcel();
    }
    createExcelFile() {
        console.log('createExcelFile method called');
        fetch(GeneratePOExcel)
            .then(response => {
                console.log('Fetch response received:', response);
                return response.blob();
            })
            .then(blob => {
                console.log('Blob created:', blob);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    console.log('Base64 data of image:', base64data);
                    this.generateExcel(base64data);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error in fetching image:', error);
            });
    }
    
    /*generateExcel(base64data) {
        console.log('generateExcel method called');
        const img = new Image();
        img.src = base64data;
        img.onload = () => {
            console.log('Image loaded:', img);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = canvas.toDataURL('image/png').split(',')[1];
            console.log('Canvas image data:', imageData);
    
            const wb = XLSX.utils.book_new();
            console.log('New workbook created:', wb);
            const ws = XLSX.utils.aoa_to_sheet([["Here is an image:"]]);
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            console.log('Worksheet added to workbook:', ws);
    
            const wsopts = {
                '!cols': Array(9).fill({ wpx: 64 }), // Adjust column width
                '!rows': Array(16).fill({ hpx: 20 }) // Adjust row height
            };
    
            XLSX.utils.sheet_add_json(ws, [], wsopts);
            XLSX.utils.book_append_sheet(wb, ws, filename);
            console.log('Worksheet options set:', wsopts);
            console.log('Worksheet options set:', JSON.stringify(wsopts) );
            const imgOpts = {
                base64: true,
                ext: 'png',
                pos: {
                    tl: { col: 0, row: 0 },
                    br: { col: 8, row: 15 }
                }
            };
    
            ws['!images'] = [{ name: 'Image', data: imageData, opts: imgOpts }];
            console.log('Image options set:', imgOpts);
            console.log('Worksheet options set:', JSON.stringify(imgOpts) );
    
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            console.log('Workbook output created:', wbout);
    
            this.xlsdoc = btoa(wbout);
            console.log('Base64 encoded workbook:', this.xlsdoc);
    
            const blob = new Blob([this.s2ab(wbout)], { type: "application/octet-stream" });
            console.log('Blob created from workbook:', blob);
    
            saveAs(blob, "test.xlsx");
            console.log('File saved as test.xlsx');
        };
    
        img.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    }*/

        createExcelFileWithImage(base64Image) {
            // Create a new workbook
            const workbook = XLSX.utils.book_new();
    
            // Add a worksheet
            const worksheet = XLSX.utils.aoa_to_sheet([
                ["Here is an image:"]
            ]);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
            // Add the image to the worksheet
            const image = workbook.SheetNames[0]; // Referring to the first sheet
            const ws = workbook.Sheets[image];
    
            // Add the image to the worksheet
            const imageId = workbook.addImage({
                base64: base64Image.split(',')[1], // Extract the base64 string
                extension: 'png', // Specify the image format
            });
    
            // Set the image position
            worksheet['!images'] = [
                { imageId, pos: { type: 'twoCellAnchor', from: { col: 1, row: 2 }, to: { col: 3, row: 4 } } }
            ];
    
            // Write the workbook to a binary format
            const workbookOut = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    
            // Create a Blob from the binary data
            const blob = new Blob([this.s2ab(workbookOut)], { type: "application/octet-stream" });
    
            // Save the file using FileSaver
            saveAs(blob, "ExcelWithImage.xlsx");
        }
    
    s2ab(s) {
        console.log('s2ab method called with string:', s);
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        console.log('ArrayBuffer view:', view);
        return buf;
    }

    handleCreateExcel() {
        // Assume the Base64 image data is provided
        const base64Image = 'data:image/png;base64,iVBORw0...'; // Example Base64 image data
        this.createExcelFileWithImage(base64Image);
    }
    
    handleRefresh(message) {
        // Access the message data
        const { recordId, refresh, data } = message;
    
        // Check if this message is a refresh message
        if (refresh) {
            // Perform the refresh logic here
            // You can access the data sent in the message payload (e.g., 'data')
            // Update your component's data or trigger a refresh action
            // Example:
            // this.refreshComponent();
        }
    }

    /*renderedCallback() {
        if(this.isLibraryLoaded) return;
        this.isLibraryLoaded = true;
        loadScript(this,workbook)
            .then(async (data) => {

                console.log("success------>>>",data);
            })
            .catch(error => {
                console.log("failure-------->>>>",error);
            });
    }*/

    renderedCallback() {
        if (this.isLibraryLoaded) return;
        this.isLibraryLoaded = true;
        loadScript(this, XLSX)
            .then(() => {
                console.log("Library loaded successfully");
                this.createExcelFile();
            })
            .catch(error => console.error("Library load failure", error));

            if (this.sheetJsInitialized) {
                return;
            }
            this.sheetJsInitialized = true;
    
            Promise.all([
                loadScript(this, XLSX),
                loadScript(this, FILESAVER)
            ])
            .then(() => {
                // Libraries loaded successfully
            })
            .catch(error => {
                console.error('Error loading libraries', error);
            });
    }

    exportToXLSX() {

        function handleSpecialCharacters(input) {
            // Replace special characters or emojis with a suitable replacement.
            // You can customize this function based on your requirements.
            return input.replace(/[^\x00-\x7F]/g, '?'); // Replace non-Latin-1 characters with '?'
        }

        
        this.isLoading = true;
        let doc = '<head>';
        doc += '<meta charset="UTF-8" />'
        doc += '<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>'
        doc += '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'
        
        doc += '</head>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += 'border-color: #D3D3D3; font-family: Time New Roman;';
        doc += 'border-collapse: collapse;';
        doc += '}';
        doc += 'td {';
        doc += 'width: 100px; height: 21px;';
        doc += '}';

        doc += 'body {';
            doc += 'font-family: Time New Roman;';
            doc += '}';

        doc += 'a:link {';
        doc += 'color: red;';
        doc += 'font-family: Arial; ';
        doc += 'font-size: 10px;';
        doc += '}';
        

        // doc += 'a {';
        // doc += 'font-family: Arial;'; // Apply Arial font to anchor tags
        // doc += '}';
        doc += '</style>';

        doc += '<table border="1">';

        

        var GeneratePOExcelImageUrl = 'https://resourceful-bear-t4xtu2-dev-ed.my.site.com/file-asset/GeneratePOExcel?v=1';

        // doc += '<tr style="font-size: 8pt;">';
        // doc += '<td colspan="9" rowspan="16">' + '<img src="https://resourceful-bear-t4xtu2-dev-ed.file.force.com/sfc/servlet.shepherd/version/download/068J3000002uoEU" alt="My Image" />'; + '</td>'; //<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
        // doc += '</tr>';

        doc += '<tr style="font-size: 8pt;">';
        doc += '<td colspan="9">';
        doc += '';
        //doc += `<img src="${GeneratePOExcelImageUrl}" alt="My Image" style="width: 5px; height: 5px;"/>`;
        doc += '</td>';
        doc += '</tr>';

        doc += '</table>';

        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'OrderData.xls'; //OrderData.csv
        document.body.appendChild(downloadElement);
        downloadElement.click();
        
        /*doc = handleSpecialCharacters(doc);
        let base64Data = btoa(doc);
        this.xlsdoc = base64Data;
        this.handlesaveexacel();*/
    }
        handlesaveexacel() {
            insertexcel({xlsdata: this.xlsdoc,recordId: this.recordId,filename: this.filename})
                .then(result => {
                    console.log("success------>>>",result);
                    this.isLoading = false;
                    let event = new ShowToastEvent({
                        title: 'success',
                        message: 'Excel File Generated Succesfully!',
                        variant: 'success',
                    });
                    this.dispatchEvent(event);
                    window.history.back();
                    this.updateRecordView();
                })
                .catch(error => {
                    console.log("failure-------->>>>",error);
                });
            Date.parse()
        }
        updateRecordView() {
            setTimeout(() => {
                eval("$A.get('e.force:refreshView').fire();");
            },1000);
        }
}