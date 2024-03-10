import { FetchApi } from './FetchApi';
import { Filters } from './Filters';
import { PaginationControl } from './FooterController';
import { InputController } from './InputController';
import { ProductItem } from './ProductItem';
import { ProductStorage } from './ProductsStorage';

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  let timestamp = Intl.DateTimeFormat('ru-Ru').format(today);
  timestamp = timestamp.split('.').reverse().join('');

  const FETCH_API = new FetchApi(
    'http://api.valantis.store:40000/',
    timestamp,
    {
      endpoints: {
        getFields: { point: 'get_fields', params: ['field', 'offset', 'limit'] },
        getListId: { point: 'get_ids', params: ['offset', 'limit'] }, // возможен без парамсов
        getItems: { point: 'get_items', params: ['ids'] },
        filter: { point: 'filter', params: ['product', 'price', 'brand'] },
      },
    },
  );

  const PRODUCT_STORAGE = new ProductStorage(
    '.list-products__container-box',
  );

  const PRODUCT_ELEMENT_SELECTORS = {
    container: 'list-products__product',
    product: 'list-products__product-name',
    brand: 'list-products__product-brand',
    price: 'list-products__product-price',
  };

  const FOOTER_CONTROLLER = new PaginationControl(
    "footer__pagination",
    'footer__pagination-item',
    'footer__pagination-arrow',
    changingPage,
  )

  const FILTERS = new Filters(
    ['product', 'price', 'brand'],
    'header__filter',
    filterSelection,
  );

  const INUPT_CONTROLLER = new InputController(
    'header__input-wrapper',
    'header__input',
    'header__input-button',
  );

  FILTERS.addEvent();
  INUPT_CONTROLLER.addEventClickButton(requestWithFilter);
  INUPT_CONTROLLER.addBlockingEvents();

  function filterSelection(filter){
    INUPT_CONTROLLER.removeBlockingEvents();
    INUPT_CONTROLLER.setSelectedFilter(filter);
  }

  function requestWithFilter(valueInput, currentFilter) {
    FETCH_API.request('filter', {[currentFilter]: valueInput}).then(
      ({ result: response }) => {
        const noDuplicateResult = Array.from(new Set(response)); // Только два дублирующих ID?
        console.log(noDuplicateResult)
      }
    )
  }

  let currentPage = undefined;

  function changingPage (numberPage = 1){
    numberPage = parseInt(numberPage)
    if(currentPage === numberPage) return false;
    currentPage = numberPage;
    const initProduct = numberPage === 1 ? 1 : numberPage * 50;
    FOOTER_CONTROLLER.addBlockingEvents();
    FOOTER_CONTROLLER.setCurrentPage(numberPage);

    FETCH_API.request('getListId', { offset: initProduct, limit: 10 }).then(({ result: response }) => {
      const noDuplicateIds = Array.from(new Set(response)); // Только два дублирующих ID?
      FETCH_API.request('getItems', { ids: noDuplicateIds }).then(({ result: arrProducts }) => {
        const listProduct = arrProducts.map((productItem) => {
          const PRODUCT_ITEM = new ProductItem(
            PRODUCT_ELEMENT_SELECTORS,
            productItem,
          );
          PRODUCT_ITEM.createElement();
          return PRODUCT_ITEM.getElement();
        });
        PRODUCT_STORAGE.cleanStorage() 
        PRODUCT_STORAGE.addProducts(listProduct);
        FOOTER_CONTROLLER.removeBlockingEvents();
      });
    })
    .catch(error => console.error(error))
    .finally(data => changingPage(currentPage))
    
  };
  
  changingPage();
  FOOTER_CONTROLLER.addEvent();
});
