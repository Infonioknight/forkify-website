import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  currPage;
  numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _pageCalculation() {
    this.currPage = this._data.page;
    this.numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
  }

  _generateMarkupButtonLeft() {
    return `
    <button data-goto="${
      this.currPage - 1
    }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.currPage - 1}</span>
    </button>   `;
  }

  _generateMarkupButtonRight() {
    return `
        <button data-goto="${
          this.currPage + 1
        }"class="btn--inline pagination__btn--next">
            <span>Page ${this.currPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> `;
  }

  _generateMarkup() {
    this._pageCalculation();
    //Page 1, there are other pages
    if (this.currPage === 1 && this.numPages > 1)
      return this._generateMarkupButtonRight();

    //Some middle page where there is a page before and after
    if (this.currPage < this.numPages && this.currPage > 1)
      return `
        ${this._generateMarkupButtonLeft()}${this._generateMarkupButtonRight()}`;

    //Last page where there are only prev pages
    if (this.numPages > 1 && this.currPage === this.numPages)
      return this._generateMarkupButtonLeft();

    //Page 1 and no other pages
    return '';
  }
}

export default new PaginationView();
