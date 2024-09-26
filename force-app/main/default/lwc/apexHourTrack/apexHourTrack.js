import { LightningElement, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @track reactiveProperty = 'Initial Value';
    nonReactiveProperty = 'Initial Value';
    title;
    greeting = 'Hello, World!';
    showButton = true;
    showT = false;

    updateProperties(event) {
        this.reactiveProperty = event.target.value; // Component rerenders
        this.nonReactiveProperty = event.target.value; // Component does not rerender
    }

    constructor(){
        super();
        console.log('constructor called');
    
        this.title = 'LWC COMPONENT';
    }

    connectedCallback(){
        console.log('connectedCallback called');
    }
    handleClick() {
        this.greeting = 'Greetings, LWC!';
        this.showButton = false;
    }

    render() {
        return this.showButton ? 
            // Render a button and the greeting
            this.showT = true : 
            // Render only the greeting
            this.showT = false;
    }
}