import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView, generateCommentsList } from './render-image-view.js';
import { openTargetElement, closeTargetElement } from './util.js';
import { addEventListeners, removeEventListeners } from './event-listeners-gallery.js';


const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
let createCommentsList;

// функция замыкание для отображения комментов
const createCommentsListWrapper = () => {
  createCommentsList();
};


// закрывает окно просмотра изображения
function closeImageView () {

  closeTargetElement(imageView);
  removeEventListeners();
}

// открывает окно просмотра изображения
function openImageView () {

  openTargetElement(imageView);
}

// открывает окно просмотра изображения при клике на миниатюру
const onThumbnailClick = (evt, photoData) => {
  const thumbnail = evt.target.closest('[data-index]');

  if (thumbnail) {
    const thumbnailId = +thumbnail.dataset.index;
    const photoDataElement = photoData.find((element) => element.id === thumbnailId);

    renderImageView(photoDataElement);

    createCommentsList = generateCommentsList(photoDataElement.comments);
    createCommentsListWrapper(); // вызывает функцию замыкание для корректного отображения комментов

    openImageView();
    thumbnail.blur(); //снимает фокус с миниатюры, чтобы при закрытии на Esc пропадала плашка со счетчиками
    addEventListeners();
  }
};

// отрисовывает галлерею
const renderGallery = () => {
  const photoDescriptions = createPhotoDescriptions();
  renderThumbnails(photoDescriptions);

  // добавляет подписку на "клик" на контейнер с миниатюрами
  thumbnailsList.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photoDescriptions);
  });
};

export { renderGallery, closeImageView, createCommentsListWrapper };
