export class ProductItem {
  constructor(selectors, productData) {
    this.selectors = selectors;
    this.productData = productData;
    this.productContainer = undefined;
  }

  createElement() {
    Object.entries(this.selectors).forEach(([key, selector]) => {
      if(!this.productContainer){
        this.productContainer = this.createTag('div', selector)
        this.productContainer.dataset.id = this.productData.id
      }else{
        this.productContainer.appendChild(this.createTag('div', selector, this.productData[key]))
      };
    });
  }

  createTag(tag, selector, text) {
    const tagElement = document.createElement(tag);
    tagElement.classList.add(selector);
    if (text) tagElement.textContent = text;
    return tagElement
  }

  getElement() {
    return this.productContainer
  }
}
