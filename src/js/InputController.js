export class InputController {
    constructor(
        inputWrapper,
        inputSelector,
        buttonSelector,
    ){
        this.inputWrapper = document.querySelector(`.${inputWrapper}`);
        this.input = document.querySelector(`.${inputSelector}`);
        this.button = document.querySelector(`.${buttonSelector}`);
        this.valueInput = undefined;
        this.currentFilter = undefined;
    }

    addBlockingEvents(){
        this.inputWrapper.classList.add('events-blocked');
    }

    removeBlockingEvents(){
        this.inputWrapper.classList.remove('events-blocked');
    }

    addEventClickButton(handlerClick){
        this.button.addEventListener('click', () => {
            this.currentFilter === 'price' 
                ? this.valueInput = parseInt(this.input.value) 
                : this.valueInput = this.input.value.toString() 
            handlerClick(this.currentFilter, this.valueInput)
        });
    }

    setSelectedFilter(value){
        this.currentFilter = value;
    }
}