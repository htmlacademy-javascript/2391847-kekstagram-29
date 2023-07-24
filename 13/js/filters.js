import { renderThumbnails } from './render-thumbnails.js';
import { getRandomArrayElement, debounce } from './util.js';

const RANDOM_AMOUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefaultButton = filtersBlock.querySelector('#filter-default');
const filterRandomButton = filtersBlock.querySelector('#filter-random');
const filterDiscussedButton = filtersBlock.querySelector('#filter-discussed');

// получает количество комментариев
const getCommentsAmount = ({ comments }) => {
  const commentsAmount = comments.length;
  return commentsAmount;
};

// функция для сортировки элементов массива данных по количеству комметов
const sortElementsByComments = (descriptionA, descriptionB) => {
  const commentsAmountA = getCommentsAmount(descriptionA);
  const commentsAmountB = getCommentsAmount(descriptionB);

  return commentsAmountB - commentsAmountA;
};

// Делает кнопку активной
const makeActive = (button) => {
  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
};

// отрисовывает миниатюры с задержкой (устраняет дребезг)
const debouncedRenderThumbnails = debounce((descriptions) => renderThumbnails(descriptions));

// отрисовывает элементы в порядке по умолчанию
const onFilterDefaultButtonClick = (descriptions) => {
  makeActive(filterDefaultButton);
  // renderThumbnails(descriptions);
  debouncedRenderThumbnails(descriptions);
};

// отрисовывает 10 рандомных элементов
const onFilterRandomButtonClick = (descriptions) => {
  makeActive(filterRandomButton);
  const randomDescriptions = [];

  while (randomDescriptions.length < RANDOM_AMOUNT) {
    const newElement = (getRandomArrayElement(descriptions));
    if (!randomDescriptions.includes(newElement)) {
      randomDescriptions.push(newElement);
    }
  }
  // renderThumbnails(randomDescriptions);
  debouncedRenderThumbnails(randomDescriptions);
};

// отрисовывает элементы в порядке по убыванию комментов
const onFilterDiscussedButtonClick = (descriptions) => {
  makeActive(filterDiscussedButton);
  const sortedDescriptions = descriptions
    .slice()
    .sort(sortElementsByComments);

  // renderThumbnails(sortedDescriptions);
  debouncedRenderThumbnails(sortedDescriptions);
};

// показывает фильтры и добавляет подписки на клики
const showFilters = (descriptions) => {
  filtersBlock.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', () => onFilterDefaultButtonClick(descriptions));
  filterRandomButton.addEventListener('click', () => onFilterRandomButtonClick(descriptions));
  filterDiscussedButton.addEventListener('click', () => onFilterDiscussedButtonClick(descriptions));

};


export { showFilters };
