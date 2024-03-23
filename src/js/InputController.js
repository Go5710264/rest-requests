export class InputController {
  constructor(
    inputWrapper,
    inputSelector,
    formSelector,
    warningSelector,
  ) {
    this.inputWrapper = document.querySelector(`.${inputWrapper}`);
    this.input = document.querySelector(`.${inputSelector}`);
    this.form = document.querySelector(`.${formSelector}`);
    this.warning = document.querySelector(`.${warningSelector}`);
    this.valueInput = undefined;
    this.currentFilter = undefined;
  }

  hideInputField() {
    if (this.inputWrapper.classList.contains('show')) this.inputWrapper.classList.remove('show')
    this.inputWrapper.classList.add('hide');
  }
  
  showInputField() {
    this.input.value = '';
    if (this.inputWrapper.classList.contains('hide')) this.inputWrapper.classList.remove('hide')
    this.inputWrapper.classList.add('show');
  }

  addEventSubmitForm(handlerClick) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.hideInputField();
      this.currentFilter === 'price'
        ? this.valueInput = parseInt(this.input.value, 10)
        : this.valueInput = this.input.value.toString();
      handlerClick(this.currentFilter, this.valueInput);
    });
  }

  setSelectedFilter(value) {
    this.currentFilter = value;
  }
}
