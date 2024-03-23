import { FetchApi } from './FetchApi';
import { Filters } from './Filters';
import { PaginationControl } from './FooterController';
import { InputController } from './InputController';
import { ProductItem } from './ProductItem';
import { ProductStorage } from './ProductsStorage';

document.addEventListener('DOMContentLoaded', () => {
  function getTimestamp() {
    const today = new Date();
    const timestamp = Intl.DateTimeFormat('ru-Ru').format(today);
    return timestamp.split('.').reverse().join('');
  }

  const FETCH_API = new FetchApi(
    'https://api.valantis.store:41000/',
    getTimestamp(),
    {
      endpoints: {
        getFields: { point: 'get_fields', params: ['field', 'offset', 'limit'] },
        getListId: { point: 'get_ids', params: ['offset', 'limit'] },
        getItems: { point: 'get_items', params: ['ids'] },
        filter: { point: 'filter', params: ['product', 'price', 'brand'] },
      },
    },
    getItemStorage,
  );

  const PRODUCT_STORAGE = new ProductStorage(
    '.list-products__container-box',
  );

  const PRODUCT_ELEMENT_SELECTORS = {
    container: 'list-products__product',
    product: 'list-products__product-name',
    brand: 'list-products__product-brand',
    id: 'list-products__product-id',
    price: 'list-products__product-price',
  };

  const FOOTER_CONTROLLER = new PaginationControl(
    'footer__pagination',
    'footer__pagination-item',
    'footer__pagination-arrow',
    changingPage,
  );

  const FILTERS = new Filters(
    ['product', 'price', 'brand'],
    'header__filter',
    filterSelection,
  );

  const INPUT_CONTROLLER = new InputController(
    'header__input-wrapper',
    'header__input',
    'header__input-form',
    'header__warning',
  );

  FILTERS.addEvent();
  INPUT_CONTROLLER.hideInputField();
  INPUT_CONTROLLER.addEventSubmitForm(requestWithFilter);

  function filterSelection(filter) {
    INPUT_CONTROLLER.showInputField();
    INPUT_CONTROLLER.setSelectedFilter(filter);
  }

  function requestWithFilter(currentFilter, valueInput) {
    PRODUCT_STORAGE.cleanStorage();
    FETCH_API.request('filter', { [currentFilter]: valueInput }, sendArrId)
      .then((response) => sendArrId(response))
      .catch((error) => console.error(error));
  }

  function getItemStorage(productData) {
    const PRODUCT_ITEM = new ProductItem(
      PRODUCT_ELEMENT_SELECTORS,
      productData,
    );
    PRODUCT_ITEM.createElement();
    return PRODUCT_ITEM.getElement();
  }

  function fillStorage({ result: arrProducts }) {
    const listProduct = arrProducts.map((productItem) => getItemStorage(productItem));
    PRODUCT_STORAGE.cleanStorage();
    PRODUCT_STORAGE.addProducts(listProduct);
    FOOTER_CONTROLLER.removeBlockingEvents();
  }

  function sendArrId({ result: arrList }) {
    const noDuplicateIds = Array.from(new Set(arrList));
    FETCH_API.request('getItems', { ids: noDuplicateIds }, fillStorage)
      .then((response) => fillStorage(response));
  }

  let currentPage;

  function changingPage(numberPage = 1) {
    const currentNumberPage = parseInt(numberPage, 10);
    if (currentPage === currentNumberPage) return;
    currentPage = currentNumberPage;
    const initProduct = currentNumberPage === 1 ? 1 : currentNumberPage * 50;
    FOOTER_CONTROLLER.addBlockingEvents();
    FOOTER_CONTROLLER.setCurrentPage(currentNumberPage);

    FETCH_API.request('getListId', { offset: initProduct, limit: 50 },sendArrId)
      .then((response) => sendArrId(response))
      .catch((error) => console.error(error));
  }

  changingPage();
  FOOTER_CONTROLLER.addEvent();
});
