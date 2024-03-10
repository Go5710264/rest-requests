export class Filters {
  constructor(
    typeFilters,
    filterSelector,
    handlerFiltering,
  ) {
    this.typeFilters = typeFilters;
    this.filterSelector = filterSelector;
    this.filtersList = document.querySelectorAll(`.${filterSelector}`);
    this.handlerFiltering = handlerFiltering;
  }

  showFilters() {
    console.log(this.filtersList);
  }

  addEvent() {
    this.filtersList.forEach((filterButton) => filterButton.addEventListener('click', () => this.wrapperHandler(filterButton)));
  }

  wrapperHandler(element) {
    const selectedFilter = this.typeFilters.find((type) => element.classList.contains(`${this.filterSelector}_${type}`));
    this.handlerFiltering(selectedFilter);
  }
}
