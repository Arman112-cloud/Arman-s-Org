import { LightningElement, track, wire } from 'lwc';
import fetchData from '@salesforce/apex/DynamicObjectViewerController.fetchData';
import getObjectOptions from '@salesforce/apex/DynamicObjectViewerController.getObjectOptions';
import getFieldOptions from '@salesforce/apex/DynamicObjectViewerController.getFieldOptions';

export default class ExcelGeneratorApp extends LightningElement {
    @track objectOptions = [];
    @track objectName = '';
    @track fieldOptions = [];
    @track selectedFields = [];
    @track records;
    @track error;

    connectedCallback() {
        this.loadObjectOptions();
    }

    loadObjectOptions() {
        getObjectOptions()
            .then(result => {
                this.objectOptions = result;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handleObjectChange(event) {
        this.objectName = event.target.value;
        this.loadFieldOptions();
    }

    loadFieldOptions() {
        getFieldOptions({ objectName: this.objectName })
            .then(result => {
                this.fieldOptions = result;
            })
            .catch(error => {
                this.error = error;
            });
    }

    handleFieldsChange(event) {
        this.selectedFields = event.detail.value;
    }

    get fieldList() {
        return this.selectedFields;
    }

    fetchRecords() {
        if (this.objectName && this.selectedFields.length > 0) {
            fetchData({ objectName: this.objectName, fields: this.selectedFields.join(',') })
                .then(result => {
                    this.records = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error.body.message;
                    this.records = undefined;
                });
        } else {
            this.error = 'Please select an object and fields.';
        }
    }

    getFieldValue(record, field) {
        return record[field];
    }
}