import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView, generateCommentsList } from './render-image-view.js';
import { openTargetElement, closeTargetElement } from './util.js';
import { addEventListeners, removeEventListeners } from './event-listeners-gallery.js';


const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
let createCommentsList;

// функция замыкание для отображения комментов
const onMoreCommentsButtonClick = () => {
  createCommentsList();
};


// закрывает окно просмотра изображения
const closeImageView = () => {

  closeTargetElement(imageView);
  removeEventListeners();
};

// открывает окно просмотра изображения
const openImageView = () => {

  openTargetElement(imageView);
};

// открывает окно просмотра изображения при клике на миниатюру
const onThumbnailClick = (evt, photoData) => {
  const thumbnail = evt.target.closest('[data-index]');

  if (thumbnail) {
    evt.preventDefault();
    const thumbnailId = parseInt(thumbnail.dataset.index, 10);
    const photoDataElement = photoData.find((element) => element.id === thumbnailId);

    renderImageView(photoDataElement);

    createCommentsList = generateCommentsList(photoDataElement.comments);
    onMoreCommentsButtonClick(); // вызывает функцию-обертку для корректного отображения комментов

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

export { renderGallery, closeImageView, onMoreCommentsButtonClick };
