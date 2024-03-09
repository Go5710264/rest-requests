export class PaginationControl{
    constructor(
        wrapperSelector,
        paginationItemSelector, 
        paginationArrowSelector,
        handlerClickPagination
    ){
        this.paginationWrapper = document.querySelector(`.${wrapperSelector}`);
        this.paginationItems = document.querySelectorAll(`.${paginationItemSelector}`);
        this.paginationArrow = document.querySelectorAll(`.${paginationArrowSelector}`);
        this.paginationArrowSelector = paginationArrowSelector;
        this.handlerClickPagination = handlerClickPagination;
        this.currentPageNumber = undefined;
        this.currentPageTag = undefined;
    }

    addEvent() {
        Array.from(this.paginationItems).forEach(item => item.addEventListener('click',
            () => this.handlerClickPagination(item.textContent)
        ))
        Array.from(this.paginationArrow).forEach(item => item.addEventListener('click', (e) => this.handlerClickArrow(item)))
    }

    handlerClickArrow(item){
        item.classList.contains(`${this.paginationArrowSelector}_back-page`) 
            ? this.currentPageNumber-- 
            : this.currentPageNumber++;
        if(this.currentPageNumber === 0) this.currentPageNumber = 1;
        this.handlerClickPagination(this.currentPageNumber);
    }

    addBlockingEvents(){
        [...this.paginationArrow, this.paginationWrapper].forEach(item => item.classList.add('events-blocked'))
    }

    removeBlockingEvents(){
        [...this.paginationArrow, this.paginationWrapper].forEach(item => item.classList.remove('events-blocked'))
    }

    setCurrentPage(numberPage){
        if(this.currentPageTag)this.currentPageTag.classList.remove('footer__pagination-item_active');
        this.currentPageNumber = numberPage;
        this.currentPageTag = [...this.paginationItems].find(item => parseInt(item.textContent) === this.currentPageNumber);
        this.currentPageTag.classList.add('footer__pagination-item_active')
    }
}