import { createPhotoDescriptions } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderImageView, generateCommentsList } from './render-image-view.js';
import { openTargetElement, closeTargetElement, isEscapeKey } from './util.js';


const thumbnailsList = document.querySelector('.pictures');
const imageView = document.querySelector('.big-picture');
const imageViewCloseButton = imageView.querySelector('.big-picture__cancel');
const moreCommentsButton = imageView.querySelector('.comments-loader');
let createCommentsList;

// функции обертки для корректного удаления обработчиков
const createCommentsListWrapper = () => {
  createCommentsList();
};

const closeImageViewWrapper = () => {
  closeImageView();
};

// закрывает окно просмотра изображения по кнопке Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageView();
  }
};

// закрывает окно просмотра изображения
function closeImageView () {
  closeTargetElement(imageView);
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  // пробуем удалять обработчик клика
  imageViewCloseButton.removeEventListener('click', closeImageViewWrapper);
  moreCommentsButton.removeEventListener('click', createCommentsListWrapper);
}

// открывает окно просмотра изображения
function openImageView () {
  openTargetElement(imageView);
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

// открывает окно просмотра изображения при клике на миниатюру
const onThumbnailClick = (evt, photoData) => {
  const thumbnail = evt.target.closest('[data-index]');

  if (thumbnail) {
    const thumbnailId = +thumbnail.dataset.index;
    const photoDataElement = photoData.find((element) => element.id === thumbnailId);

    renderImageView(photoDataElement);
    // вызывает функцию замыкание для корректного отображения комментов
    createCommentsList = generateCommentsList(photoDataElement.comments);
    createCommentsListWrapper();

    openImageView();
    thumbnail.blur(); //снимает фокус с миниатюры, чтобы при закрытии на Esc пропадала плашка со счетчиками

    // добавляет слушателей события "клик"
    imageViewCloseButton.addEventListener('click', closeImageViewWrapper);
    moreCommentsButton.addEventListener('click', createCommentsListWrapper);
  }
};

// отрисовывает галлерею
const renderGallery = () => {
  const photoDescriptions = createPhotoDescriptions();
  renderThumbnails(photoDescriptions);

  // добавляет слушателя события "клик" на контейнер с миниатюрами
  thumbnailsList.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photoDescriptions);
  });
};

export { renderGallery };
