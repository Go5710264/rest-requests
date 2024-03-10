export class PaginationControl {
  constructor(
    wrapperSelector,
    paginationItemSelector,
    paginationArrowSelector,
    handlerClickPagination,
  ) {
    this.pagWrapper = document.querySelector(`.${wrapperSelector}`);
    this.pagItems = document.querySelectorAll(`.${paginationItemSelector}`);
    this.pagArrow = document.querySelectorAll(`.${paginationArrowSelector}`);
    this.pagArrowSelector = paginationArrowSelector;
    this.handlerClickPagination = handlerClickPagination;
    this.curPageNum = undefined;
    this.curTag = undefined;
  }

  addEvent() {
    Array.from(this.pagItems).forEach((item) => item.addEventListener(
      'click',
      () => this.handlerClickPagination(item.textContent),
    ));
    Array.from(this.pagArrow).forEach((item) => item.addEventListener('click', () => this.handlerClickArrow(item)));
  }

  handlerClickArrow(item) {
    item.classList.contains(`${this.pagArrowSelector}_back-page`)
      ? this.curPageNum -= 1
      : this.curPageNum += 1;
    if (this.curPageNum === 0) this.curPageNum = 1;
    this.handlerClickPagination(this.curPageNum);
  }

  addBlockingEvents() {
    [...this.pagArrow, this.pagWrapper].forEach((item) => item.classList.add('events-blocked'));
  }

  removeBlockingEvents() {
    [...this.pagArrow, this.pagWrapper].forEach((item) => item.classList.remove('events-blocked'));
  }

  setCurrentPage(numberPage) {
    if (this.curTag) this.curTag.classList.remove('footer__pagination-item_active');
    this.curPageNum = numberPage;
    this.curTag = [...this.pagItems].find((i) => parseInt(i.textContent, 10) === this.curPageNum);
    this.curTag.classList.add('footer__pagination-item_active');
  }
}
