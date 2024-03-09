export class Filters{
    constructor(
        filtersSelector,
        filterNameSelector,
        filterPriceSelector,
        filterBrandSelector
    ){
        this.filtersList=document.querySelectorAll(`.${filtersSelector}`);
        this.filterName=document.querySelector(`.${filterNameSelector}`);
        this.filterPrice=document.querySelector(`.${filterPriceSelector}`);
        this.filterBrand=document.querySelector(`.${filterBrandSelector}`)
    }

    showFilters(){
        console.log(this.filtersList)
    }
}