import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_AMOUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultFilter = filtersBlock.querySelector('#filter-default');
const randomFilter = filtersBlock.querySelector('#filter-random');
const discussedFilter = filtersBlock.querySelector('#filter-discussed');
let currentFilter = defaultFilter;
let descriptions = [];

// сортирует элементы по убыванию
const sortElementsByComments = (descriptionA, descriptionB) => descriptionB.comments.length - descriptionA.comments.length;

// сортирует элементы рандомно
const sortElementsRandomly = () => Math.random() - 0.5;

// сортирует элементы массива данных в зависимости от выбранного фильтра
const getSortedElements = () => {
  switch (currentFilter) {
    case randomFilter:
      return [...descriptions].sort(sortElementsRandomly).slice(0, RANDOM_AMOUNT);
    case discussedFilter:
      return [...descriptions].sort(sortElementsByComments);
    case defaultFilter:
      return [...descriptions];
  }
};

// Делает кнопку активной
const makeActive = (filter) => {
  currentFilter = filter;
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
};

// отрисовывает миниатюры с задержкой (устраняет дребезг)
const debouncedRenderThumbnails = debounce((elements) => renderThumbnails(elements));

// отрисовывает миниатюры в зависимости от выбранного фильтра
const onFilterButtonClick = (evt) => {
  const selectedFilter = evt.target.closest('.img-filters__button');

  if (selectedFilter && selectedFilter !== currentFilter) {
    makeActive(selectedFilter);
    debouncedRenderThumbnails(getSortedElements());
  }
};

// показывает фильтры и добавляет подписки на клики
const showFilters = (loadedDescriptions) => {
  filtersBlock.classList.remove('img-filters--inactive');
  descriptions = [...loadedDescriptions];

  filtersForm.addEventListener('click', onFilterButtonClick);
};

export { showFilters, getSortedElements };
