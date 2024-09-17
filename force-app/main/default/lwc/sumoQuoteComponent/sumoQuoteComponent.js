import { LightningElement, track } from 'lwc';

export default class SumoQuoteComponent extends LightningElement {
    value = 'My PDFs';

    get options() {
        return [
            { label: 'My PDFs', value: 'My PDFs' },
            { label: 'Shared PDFs', value: 'Shared PDFs' },
            { label: 'Single Use PDF', value: 'Single Use PDF' },
            { label: 'Text page', value: 'Text page' },
        ];
    }

    @track MyPDFS = true;
    @track SharedPDFS = false;
    @track SingleUsePDF = false;
    @track TextPage = false;
    
    
    handleRadioChange(event) {
        const selectedOption = event.detail.value;
        //alert('selectedOption ' + selectedOption);
        if (selectedOption == 'My PDFs'){
            this.MyPDFS = true;
        } else{
            this.MyPDFS = false;
        }

        if (selectedOption == 'Shared PDFs'){
            this.SharedPDFS = true;
        }else{
            this.SharedPDFS = false;
        }

        if (selectedOption == 'Single Use PDF'){
            this.SingleUsePDF = true;
        }else{
            this.SingleUsePDF = false;
        }

        if (selectedOption == 'Text page'){
            this.TextPage = true;
        }else{
            this.TextPage = false;
        }
    }

    myVal = '**Hello**';
    formats = [
        'bold',
        'italic',
        'underline',
        'list',
        'link',
    ];
}