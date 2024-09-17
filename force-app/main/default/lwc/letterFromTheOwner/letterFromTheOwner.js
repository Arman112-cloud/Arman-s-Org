import { LightningElement } from 'lwc';

export default class LetterFromTheOwner extends LightningElement {
    myVal = "";
    formats = [
        'bold',
        'italic',
        'underline',
        'list',
        'link',
    ];
}