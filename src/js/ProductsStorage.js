export class ProductStorage {
  constructor(selContainer) {
    this.storage = document.querySelector(selContainer);
    this.storageContent = undefined;
  }

  addProducts(element) {
    this.storageContent = element.map((product) => this.storage.appendChild(product));
  }

  cleanStorage() {
    if (this.storageContent) this.storage.innerHTML = '';
  }

  getStorageContent() {
    return this.storageContent;
  }
}
