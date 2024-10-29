import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcFormComponent extends LightningElement {
    @track field1 = '';
    @track field2 = '';
    @track field3 = '';
    @track field4 = '';
    @track field5 = '';

    // Handle input changes
    handleInputChange(event) {
        const fieldName = event.target.label.toLowerCase().replace(' ', '');
        this[fieldName] = event.target.value;
    }

    // Handle form submission
    handleSubmit() {
        const allFields = this.template.querySelectorAll('lightning-input');
        let allValid = true;

        // Validate all fields
        allFields.forEach(inputField => {
            if (!inputField.reportValidity()) {
                allValid = false;
            }
        });

        if (allValid) {
            // Show success toast if all fields are valid
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'All fields are valid!',
                    variant: 'success'
                })
            );
        } else {
            // Handle invalid fields
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please fill all required fields.',
                    variant: 'error'
                })
            );
        }
    }
}
