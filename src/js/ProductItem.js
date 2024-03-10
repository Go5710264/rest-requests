export class ProductItem {
  constructor(selectors, productData) {
    this.selectors = selectors;
    this.productData = productData;
    this.productContainer = undefined;
    this.tagElement = undefined;
  }

  createElement() {
    Object.entries(this.selectors).forEach(([key, selector]) => {
      if (!this.productContainer) {
        this.productContainer = this.createTag('div', selector);
        this.productContainer.dataset.id = this.productData.id;
      } else {
        this.productContainer.appendChild(this.createTag('div', selector, this.productData[key]));
      }
    });
  }

  createTag(tag, selector, text) {
    this.tagElement = document.createElement(tag);
    this.tagElement.classList.add(selector);
    if (text) this.tagElement.textContent = text;
    return this.tagElement;
  }

  getElement() {
    return this.productContainer;
  }
}
