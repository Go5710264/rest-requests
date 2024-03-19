export class InputController {
  constructor(
    inputWrapper,
    inputSelector,
    buttonSelector,
    warningSelector,
  ) {
    this.inputWrapper = document.querySelector(`.${inputWrapper}`);
    this.input = document.querySelector(`.${inputSelector}`);
    this.button = document.querySelector(`.${buttonSelector}`);
    this.warning = document.querySelector(`.${warningSelector}`);
    this.valueInput = undefined;
    this.currentFilter = undefined;
  }

  addBlockingEvents() {
    this.inputWrapper.classList.add('events-blocked');
    this.displayWarning(true);
  }

  removeBlockingEvents() {
    this.inputWrapper.classList.remove('events-blocked');
    this.displayWarning();
  }

  addEventClickButton(handlerClick) {
    this.button.addEventListener('click', () => {
      this.currentFilter === 'price'
        ? this.valueInput = parseInt(this.input.value, 10)
        : this.valueInput = this.input.value.toString();
      handlerClick(this.currentFilter, this.valueInput);
    });
  }

  setSelectedFilter(value) {
    this.currentFilter = value;
  }

  displayWarning(boolean){
    if(boolean) {
      this.warning.classList.remove('hide');
      this.warning.classList.add('show');
    } 

    if(!boolean) {
      this.warning.classList.add('hide');
      this.warning.classList.remove('show');
    }
  }
}
