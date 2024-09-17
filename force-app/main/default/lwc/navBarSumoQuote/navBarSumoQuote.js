import { LightningElement, track } from 'lwc';

export default class NavBarSumoQuote extends LightningElement {
    @track dragStart;
    @track ElementList = [];

    connectedCallback() {
        console.log('connected callback');
        this.elementlist();
        
    }

    elementlist(){
        console.log('element list method called');
        let ElementList = [{}];
        console.log('title',this.title);
        this.ElementList = ElementList;
        console.log('element list is here',JSON.stringify(this.ElementList));
    }


    DragStart(event) {
        console.log('DragStart event called')
        this.dragStart = event.currentTarget.title;
        // this.dragStart = event.Target.title;
        console.log('this.dragStart',this.dragStart);
        event.target.classList.add("drag");
        console.log('event,target.classList');
      }
    
      DragOver(event) {
        event.preventDefault();
        return false;
      }
    
      Drop(event) {
        event.stopPropagation();
        const DragValName = this.dragStart;
        const DropValName = event.target.title;
        console.log(('DragValName =',DragValName));
        console.log(('DropValName =',DropValName));
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