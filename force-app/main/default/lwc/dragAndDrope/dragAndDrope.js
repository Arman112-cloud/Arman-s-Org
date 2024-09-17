import { LightningElement, wire, track } from 'lwc';
import AccountLWC from '@salesforce/apex/AccountLWC.AccountLWC';
export default class DragAndDrope extends LightningElement {
    @track dragStart;
  @track ElementList = [];

  connectedCallback() {
    AccountLWC()
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          this.ElementList.push(result[i]);
        }
      })
      .catch((error) => {
        console.log("###Error : " + error.body.message);
      });
  }
  DragStart(event) {
    this.dragStart = event.target.title;
    console.log('this.dragStart-------------------',this.dragStart);
    event.target.classList.add("drag");
  }

  DragOver(event) {
    event.preventDefault();
    return false;
  }

  Drop(event) {
    event.stopPropagation();
    const DragValName = this.dragStart;
    const DropValName = event.target.title;
    if (DragValName === DropValName) {
      return false;
    }
    const index = DropValName;
    const currentIndex = DragValName;
    const newIndex = DropValName;
    Array.prototype.move = function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);
    };
    this.ElementList.move(currentIndex, newIndex);
  }
}